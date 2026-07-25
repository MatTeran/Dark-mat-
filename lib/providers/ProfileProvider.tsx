import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  DEFAULT_ATHLETE_HUB,
  formatBeltRank,
  formatMembershipPlan,
  formatStripeCount,
} from '../mocks/profile';
import type {
  AppSettings,
  AthleteHub,
  FamilyMember,
  NotificationSettings,
  PaymentMethod,
} from '../../types/profile';
import type { BeltRank } from '../../types/user';

interface ProfileContextValue {
  hub: AthleteHub;
  membershipLabel: string;
  beltLabel: string;
  stripesLabel: string;
  paymentLabel: string;
  attendanceLabel: string;
  familyCountLabel: string;
  updateNotifications: (patch: Partial<NotificationSettings>) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  setBeltProgress: (belt: BeltRank, stripes: 0 | 1 | 2 | 3 | 4) => void;
  unlinkFamilyMember: (memberId: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: PropsWithChildren) {
  const [hub, setHub] = useState<AthleteHub>(DEFAULT_ATHLETE_HUB);

  const updateNotifications = useCallback(
    (patch: Partial<NotificationSettings>) => {
      setHub((current) => ({
        ...current,
        notifications: { ...current.notifications, ...patch },
      }));
    },
    [],
  );

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setHub((current) => ({
      ...current,
      settings: { ...current.settings, ...patch },
    }));
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethod | null) => {
    setHub((current) => ({
      ...current,
      paymentMethod: method,
    }));
  }, []);

  const setBeltProgress = useCallback(
    (belt: BeltRank, stripes: 0 | 1 | 2 | 3 | 4) => {
      setHub((current) => ({
        ...current,
        beltProgress: {
          ...current.beltProgress,
          belt,
          stripes,
        },
      }));
    },
    [],
  );

  const unlinkFamilyMember = useCallback((memberId: string) => {
    setHub((current) => ({
      ...current,
      familyMembers: current.familyMembers.filter(
        (member) => member.id !== memberId,
      ),
    }));
  }, []);

  const addFamilyMember = useCallback((member: Omit<FamilyMember, 'id'>) => {
    setHub((current) => ({
      ...current,
      familyMembers: [
        ...current.familyMembers,
        { ...member, id: `fam-${Date.now()}` },
      ],
    }));
  }, []);

  const value = useMemo<ProfileContextValue>(() => {
    const { membership, beltProgress, paymentMethod, attendanceSummary } = hub;
    return {
      hub,
      membershipLabel: `${formatMembershipPlan(membership.plan)} · ${membership.status === 'active' ? 'Active' : membership.status}`,
      beltLabel: formatBeltRank(beltProgress.belt),
      stripesLabel: formatStripeCount(beltProgress.stripes),
      paymentLabel: paymentMethod
        ? `${paymentMethod.brand} ···· ${paymentMethod.last4}`
        : 'None on file',
      attendanceLabel: `${attendanceSummary.classesAttended}/${attendanceSummary.goal} classes`,
      familyCountLabel:
        hub.familyMembers.length === 0
          ? 'None linked'
          : `${hub.familyMembers.length} linked`,
      updateNotifications,
      updateSettings,
      setPaymentMethod,
      setBeltProgress,
      unlinkFamilyMember,
      addFamilyMember,
    };
  }, [
    hub,
    updateNotifications,
    updateSettings,
    setPaymentMethod,
    setBeltProgress,
    unlinkFamilyMember,
    addFamilyMember,
  ]);

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
