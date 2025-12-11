export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EXPLORER = "EXPLORER",
}

export enum TripStatus {
  PLANNED = "PLANNED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum MatchStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  BLOCKED = "BLOCKED",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum LookingFor {
  MALE = "MALE",
  FEMALE = "FEMALE",
  ANYONE = "ANYONE",
}

export enum SubscriptionPlan {
  FREE = "FREE",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
