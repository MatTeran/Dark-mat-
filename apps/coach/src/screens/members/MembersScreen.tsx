import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Card,
  Input,
  Screen,
  Spacer,
  Text,
  spacing,
} from '@darkmat/shared';

import {
  EmptyState,
  FadeInItem,
  StatusPill,
} from '../../components/ui/Motion';
import { useCoachData } from '../../lib/providers/CoachDataProvider';
import type { MembersStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MembersStackParamList, 'MembersHome'>;

export function MembersScreen({ navigation }: Props) {
  const { members } = useCoachData();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return members;
    }
    return members.filter(
      (member) =>
        member.fullName.toLowerCase().includes(needle) ||
        member.email.toLowerCase().includes(needle),
    );
  }, [members, query]);

  return (
    <Screen scroll keyboard>
      <Text variant="hero">Members</Text>
      <Text variant="body" muted>
        Searchable roster with private coach context.
      </Text>
      <Spacer size="lg" />
      <Input
        label="Search"
        placeholder="Name or email"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />
      <Spacer size="lg" />

      {filtered.length === 0 ? (
        <EmptyState title="No members" subtitle="Try a different search." />
      ) : (
        <View style={styles.list}>
          {filtered.map((member, index) => (
            <FadeInItem key={member.id} index={index}>
              <Card
                onPress={() =>
                  navigation.navigate('MemberDetail', { memberId: member.id })
                }
              >
                <View style={styles.row}>
                  <View style={styles.avatar}>
                    <Text variant="subtitle" gold>
                      {member.fullName
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)}
                    </Text>
                  </View>
                  <View style={styles.copy}>
                    <Text variant="subtitle">{member.fullName}</Text>
                    <Text variant="caption" muted>
                      {member.belt} belt · {member.stripes} stripes
                    </Text>
                    <Text variant="caption" muted>
                      {member.email}
                    </Text>
                  </View>
                  <StatusPill
                    label={member.membershipStatus}
                    color={
                      member.membershipStatus === 'active'
                        ? '#22C55E'
                        : '#F59E0B'
                    }
                  />
                </View>
              </Card>
            </FadeInItem>
          ))}
        </View>
      )}
      <Spacer size="xl" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.16)',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
