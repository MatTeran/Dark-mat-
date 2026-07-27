import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Banner,
  Button,
  Card,
  Input,
  Screen,
  Spacer,
  Text,
  spacing,
  type CoachMemberProfile,
} from '@darkmat/shared';

import { SectionHeader, StatusPill } from '../../components/ui/Motion';
import { useCoachData } from '../../lib/providers/CoachDataProvider';
import type { MembersStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MembersStackParamList, 'MemberDetail'>;

export function MemberDetailScreen({ route }: Props) {
  const { getMember, addCoachNote } = useCoachData();
  const [profile, setProfile] = useState<CoachMemberProfile | null>(null);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void getMember(route.params.memberId).then(setProfile);
  }, [getMember, route.params.memberId]);

  if (!profile) {
    return (
      <Screen>
        <Text variant="title">Loading member…</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll keyboard>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text variant="title" gold>
            {profile.fullName
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)}
          </Text>
        </View>
        <View style={styles.headerCopy}>
          <Text variant="hero">{profile.fullName}</Text>
          <Text variant="body" muted>
            {profile.email}
          </Text>
          <Spacer size="xs" />
          <StatusPill
            label={`${profile.belt} · ${profile.stripes} stripes`}
            color="#D4AF37"
          />
        </View>
      </View>

      <Spacer size="lg" />
      <Card elevated>
        <Text variant="label">Membership</Text>
        <Spacer size="xs" />
        <Text variant="subtitle">
          {profile.membershipPlan} · {profile.membershipStatus}
        </Text>
        <Text variant="caption" muted>
          {profile.academyName}
        </Text>
      </Card>

      <Spacer size="md" />
      <Card>
        <SectionHeader title="Journey Summary" />
        <Text variant="body">
          {profile.journey.levelLabel} · {profile.journey.totalClasses} classes
        </Text>
        <Text variant="caption" muted>
          Member since {profile.journey.memberSince}
        </Text>
        <Text variant="caption" muted>
          Next: {profile.journey.nextMilestone}
        </Text>
      </Card>

      <Spacer size="md" />
      <Card>
        <SectionHeader title="Training Statistics" />
        <Text variant="body">
          Month {profile.trainingStats.classesThisMonth} · Year{' '}
          {profile.trainingStats.classesThisYear}
        </Text>
        <Text variant="caption" muted>
          Attendance {profile.trainingStats.attendanceRate}% · Streak{' '}
          {profile.trainingStats.currentStreakDays} days
        </Text>
        <Text variant="caption" muted>
          Favorite: {profile.trainingStats.favoriteClassType}
        </Text>
      </Card>

      <Spacer size="md" />
      <Card>
        <SectionHeader title="Achievements" />
        {profile.achievements.length === 0 ? (
          <Text variant="caption" muted>
            No achievements yet.
          </Text>
        ) : (
          profile.achievements.map((item) => (
            <Text key={item.id} variant="body">
              {item.title} · {item.earnedAt}
            </Text>
          ))
        )}
      </Card>

      <Spacer size="md" />
      <Card>
        <SectionHeader title="Emergency Contact" />
        {profile.emergencyContact ? (
          <>
            <Text variant="body">{profile.emergencyContact.name}</Text>
            <Text variant="caption" muted>
              {profile.emergencyContact.relationship} ·{' '}
              {profile.emergencyContact.phone}
            </Text>
          </>
        ) : (
          <Text variant="caption" muted>
            No emergency contact on file.
          </Text>
        )}
      </Card>

      <Spacer size="md" />
      <Card>
        <SectionHeader title="Waivers" />
        {profile.waivers.map((waiver) => (
          <View key={waiver.id} style={styles.row}>
            <Text variant="body">{waiver.title}</Text>
            <StatusPill
              label={waiver.status}
              color={waiver.status === 'valid' ? '#22C55E' : '#FF4D4D'}
            />
          </View>
        ))}
      </Card>

      <Spacer size="md" />
      <Card>
        <SectionHeader title="Competition History" />
        {profile.competitionHistory.length === 0 ? (
          <Text variant="caption" muted>
            No competitions logged.
          </Text>
        ) : (
          profile.competitionHistory.map((item) => (
            <Text key={item.id} variant="body">
              {item.eventName} · {item.result} · {item.date}
            </Text>
          ))
        )}
      </Card>

      <Spacer size="md" />
      <Card>
        <SectionHeader title="Recent Classes" />
        {profile.recentClasses.length === 0 ? (
          <Text variant="caption" muted>
            No recent classes.
          </Text>
        ) : (
          profile.recentClasses.map((item) => (
            <Text key={`${item.id}-${item.date}`} variant="body">
              {item.title} · {item.date} · {item.status}
            </Text>
          ))
        )}
      </Card>

      <Spacer size="md" />
      <Card elevated>
        <SectionHeader
          title="Private Coach Notes"
          subtitle="Visible only to coaches"
        />
        {message ? (
          <>
            <Banner tone="success" message={message} />
            <Spacer size="sm" />
          </>
        ) : null}
        {profile.coachNotes.map((item) => (
          <View key={item.id} style={styles.note}>
            <Text variant="body">{item.body}</Text>
            <Text variant="caption" muted>
              {item.authorName} · {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        ))}
        <Spacer size="sm" />
        <Input
          label="Add note"
          value={note}
          onChangeText={setNote}
          placeholder="Private observation…"
          multiline
        />
        <Spacer size="sm" />
        <Button
          label="Save Note"
          loading={loading}
          disabled={!note.trim()}
          onPress={async () => {
            setLoading(true);
            try {
              await addCoachNote({ memberId: profile.id, body: note });
              const refreshed = await getMember(profile.id);
              setProfile(refreshed);
              setNote('');
              setMessage('Private note saved.');
            } finally {
              setLoading(false);
            }
          }}
        />
      </Card>
      <Spacer size="xl" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.16)',
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  note: {
    gap: 4,
    marginBottom: spacing.sm,
  },
});
