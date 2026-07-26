import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import {
  Banner,
  Button,
  FadeIn,
  LocalEventCard,
  LocalEventFilterRow,
  Screen,
  Spacer,
  Text,
} from '../../components';
import { useAppTheme } from '../../hooks';
import {
  filterLocalEvents,
  getExternalSearchLinks,
  searchLocalEvents,
} from '../../services/events/localEventsSearch';
import { spacing } from '../../lib/theme';
import type { HomeStackParamList } from '../../types/navigation';
import type { LocalEventFilter } from '../../types/localEvents';

type Props = NativeStackScreenProps<HomeStackParamList, 'LocalEvents'>;

export function LocalEventsScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const [filter, setFilter] = useState<LocalEventFilter>('all');

  const query = useQuery({
    queryKey: ['local-events'],
    queryFn: () => searchLocalEvents({ radiusMiles: 250 }),
  });

  const events = useMemo(
    () => filterLocalEvents(query.data?.events ?? [], filter),
    [filter, query.data?.events],
  );

  const locationLabel = query.data?.location.label ?? 'your area';
  const externalLinks = getExternalSearchLinks(locationLabel);

  const openUrl = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      // Ignore if the device cannot open the URL.
    }
  };

  return (
    <Screen
      scroll
      contentStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={query.isRefetching}
          onRefresh={() => {
            void query.refetch();
          }}
          tintColor={colors.goldAccent}
        />
      }
    >
      <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
      <Spacer size="md" />

      <FadeIn>
        <Text variant="hero">Local Events</Text>
        <Spacer size="sm" />
        <Text variant="bodyMuted">
          Seminars and tournaments near {locationLabel}, pulled live from
          Smoothcomp.
        </Text>
      </FadeIn>

      <Spacer size="md" />

      {query.data?.usedFallback ? (
        <>
          <Banner
            tone="info"
            message="Location permission is off — showing events near Tracy, CA (Dark Mat). Enable location for results around you."
          />
          <Spacer size="md" />
        </>
      ) : null}

      {query.isError ? (
        <>
          <Banner message="Could not reach the online events feed. Pull to refresh, or search the web below." />
          <Spacer size="md" />
        </>
      ) : null}

      <LocalEventFilterRow value={filter} onChange={setFilter} />

      <Spacer size="lg" />

      {query.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.goldAccent} />
          <Spacer size="sm" />
          <Text variant="caption" style={{ color: colors.secondaryText }}>
            Searching online near {locationLabel}…
          </Text>
        </View>
      ) : events.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="subtitle" gold>
            No matches nearby
          </Text>
          <Spacer size="xs" />
          <Text variant="bodyMuted" style={styles.center}>
            Try another filter, widen your search online, or pull to refresh.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          <Text variant="caption" style={{ color: colors.secondaryText }}>
            {events.length} event{events.length === 1 ? '' : 's'} within 250 mi
            {query.data?.sourceLabel ? ` · ${query.data.sourceLabel}` : ''}
          </Text>
          <Spacer size="sm" />
          {events.map((event, index) => (
            <FadeIn key={event.id} delay={40 + index * 30}>
              <LocalEventCard
                event={event}
                onPress={() => {
                  void openUrl(event.url);
                }}
              />
              <Spacer size="sm" />
            </FadeIn>
          ))}
        </View>
      )}

      <Spacer size="lg" />
      <Text variant="subtitle">Search online</Text>
      <Spacer size="xs" />
      <Text variant="caption" style={{ color: colors.secondaryText }}>
        Open a broader web search for more seminars and tournaments.
      </Text>
      <Spacer size="sm" />
      <View style={styles.links}>
        {externalLinks.map((link) => (
          <Pressable
            key={link.label}
            onPress={() => {
              void openUrl(link.url);
            }}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <View
              style={[
                styles.linkChip,
                {
                  borderColor: colors.goldAccent,
                  backgroundColor: colors.goldMuted,
                },
              ]}
            >
              <Text variant="caption" style={{ color: colors.goldAccent }}>
                {link.label}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  loading: {
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  center: {
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  linkChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.88,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});
