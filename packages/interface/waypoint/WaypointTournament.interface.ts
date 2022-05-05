import { SanitizedParticipantMap } from "./SanitizedParticipant.interface"
import { SanitizedSeriesMap } from "./SanitizedSeries.interface"

export interface ChalTourRes {
  tournament: ChallongeTournament
}

export type ChallongeTournament = {
  accept_attachments?: boolean
  allow_participant_match_reporting?: boolean
  anonymous_voting?: boolean
  category?: string
  check_in_duration?: number | null // in minutes
  completed_at?: Date | null
  created_at?: string
  created_by_api?: boolean
  credit_capped?: boolean
  description?: string
  game_id?: number
  group_stages_enabled?: boolean
  hide_forum?: boolean
  hide_seeds?: boolean
  hold_third_place_match?: boolean
  id?: number
  max_predictions_per_user?: number
  name: string
  notify_users_when_matches_open?: boolean
  notify_users_when_the_tournament_ends?: boolean
  open_signup?: boolean
  participants_count?: number
  prediction_method?: number
  predictions_opened_at?: null
  private?: boolean
  progress_meter?: number
  pts_for_bye?: string
  pts_for_game_tie?: string
  pts_for_game_win?: string
  pts_for_match_tie?: string
  pts_for_match_win?: string
  quick_advance?: boolean
  ranked_by?: string
  require_score_agreement?: boolean
  rr_pts_for_game_tie?: string
  rr_pts_for_game_win?: string
  rr_pts_for_match_tie?: string
  rr_pts_for_match_win?: string
  sequential_pairings?: boolean
  show_rounds?: boolean
  signup_cap?: null
  start_at?: Date | null
  started_at?: null
  started_checking_in_at?: null
  state?: string
  swiss_rounds?: number
  teams?: boolean
  tie_breaks?: string[]
  tournament_type?:
    | "single elimination"
    | "double elimination"
    | "round robin"
    | "swiss"
  updated_at?: string
  url?: string
  description_source?: string
  subdomain?: null
  full_challonge_url?: string
  live_image_url?: string
  sign_up_url?: null
  review_before_finalizing?: boolean
  accepting_predictions?: boolean
  participants_locked?: boolean
  game_name?: string
  participants_swappable?: boolean
  team_convertable?: boolean
  group_stages_were_started?: boolean
  matches?: ChallongeSeriesResponse[]
  participants?: ChallongeParticipantResponse[]
}

export type Tournament = {
  tournament: ChallongeTournament
  orgId: string
  autoAcceptParticipants?: boolean
  activePlayerCountPerTeam?: number
  maxTeamCount?: number
  maxSubPlayerPerTeam?: number
  /**
   * means...
   * # IS VERIFIED STUDENTS ONLY?
   */
  isSchoolOnly?: boolean
  sameSchoolOnly?: boolean
  logo?: string
  profileImage?: string
  backgroundImage?: string
  createdAt?: Date
  updatedAt?: Date
  visibility: Visibility
  tournamentId?: string
  regOpen?: boolean
  regOpenDate?: Date
  regEndDate?: Date
  startDate?: Date
  endDate?: Date
  schoolsAllowed?: string[]
  admins?: string[]
  orgData?: any
  id: string
  game?: string
  description?: string
  rules?: string
  prizes?: Prize[]
  commsChannelLink?: string
  enableCustomFields?: boolean
  customFields: CustomFieldMap
  typeformId?: string
  seo?: any
  leagueId: string
  leagueTitle: string
  _leagueTitle: string
  acceptedTeamCount?: number
  registeredTeamCount?: number
  lookingForCheckIns?: boolean
  allowPendingCheckIn?: boolean
  checkInStartedAt?: boolean
  allowContainedTeams?: boolean
  checkInProcessed?: boolean
  matches: SanitizedSeriesMap
  participants: SanitizedParticipantMap
}

type DateFields =
  | "createdAt"
  | "updatedAt"
  | "regOpenDate"
  | "regEndDate"
  | "startDate"
  | "endDate"
  | "checkInStartedAt"

export type TournamentFS = Omit<Tournament, DateFields> &
  Partial<Record<DateFields, Date>>
export type Visibility = "draft" | "public"

export type Prize = {
  placement: string
  name: string
  description?: string
  items: PrizeItem[]
  cash: string
  category: CustomFieldPrizeCategory
  winner?: string
  defaultImage?: string
  icon?: string
}

export type CustomFieldPrizeCategory = "primary" | "secondary" | "giveaway"

export type PrizeItem = {
  name: string
  count: number
  description?: string
  image?: string
  url?: string
}

// ========== SERIES

export class SeriesTeam {
  id: number | null
  isPrereqMatchLoser: boolean
  prereqMatchId: number

  constructor(data: {
    id: number | null
    isPrereqMatchLoser: boolean
    prereqMatchId: number
  }) {
    ;(this.id = data.id), (this.isPrereqMatchLoser = data.isPrereqMatchLoser)
    this.prereqMatchId = data.prereqMatchId
  }
}

export interface Series {
  createdAt: Date
  groupId: number
  attachmentCount: number
  hasAttachment: boolean
  id: number
  identifier: string
  loserId: number | null
  winnerId: number | null
  teamA: SeriesTeam
  teamB: SeriesTeam
  round: number
  scheduledTime: Date | null
  startedAt: Date | null
  state: string
  tournamentId: number
  underwayAt: Date | null
  updatedAt: Date | null
  prerequisiteMatchIds: string[]
  scores: string[]
  checkInOpen?: boolean
  checkIns?: Record<string, Date>
  /**
   * A record that takes the user id as
   * property name and score report as value
   */
  scoreReports?: Record<string, UserScoreReport>
}

// Generated by https://quicktype.io

export interface ChallongeSeriesResponse {
  match: ChallongeSeries
}

export interface ChallongeSeries {
  attachment_count: number
  created_at: string
  group_id: number
  has_attachment: boolean
  id: number
  identifier: string
  location: string
  loser_id: number
  player1_id: number
  player1_is_prereq_match_loser: boolean
  player1_prereq_match_id: number
  player1_votes: number
  player2_id: number
  player2_is_prereq_match_loser: boolean
  player2_prereq_match_id: number
  player2_votes: number
  round: number
  scheduled_time: string
  started_at: string
  state: string
  tournament_id: number
  underway_at: string
  updated_at: string
  winner_id: number | null
  prerequisite_match_ids_csv: string
  scores_csv: string
}

export type UserScoreReport = {
  username: string
  uid: string
  teamId: string
  teamName: string
  data: MatchReport
  winner?: string | null
  isVerified?: boolean
  isDenied?: boolean
  reviewedBy?: string
  reviewedByUsername?: string
  reviewerComment?: string
}
export type MatchReport = Record<string, MatchReportData>

export interface MatchReportData {
  screenshot: string
  matchNumber: string
  score: Record<string, number>
}

// ============== PARTICIPANT

export type Participant = {
  name: string
  teamId: string
  tournamentId: string
  playerIds: string[]
  captain: string
  players: PlayerMap
  subs: PlayerMap
  school: string
  createdAt: Date
  updatedAt: Date
  isAccepted: boolean
  logo?: string
  teamData: Team
  chalId?: number
  chalData?: ChallongeParticipant
  customFieldAnswers?: CustomFieldAnswerMap
  checkInAt?: Date
}

export type PlayerMap = Record<string, WaypointUser>

export class CustomField {
  type: CustomFieldType = "text"
  fieldName = ""
  perPlayer = false
  description = ""
  isPublic?: boolean = false
  gameId?: string
}

export type CustomFieldType = "text" | "file"

export interface CustomFieldsAnswersConstructor {
  fields: Record<string, CustomField>
  players: PlayerMap
}

export type CustomFieldAnswerMap = Record<string, FieldWithAnswer>

export interface CustomFieldsAnswers extends CustomFieldAnswerMap {
  [key: string]: FieldWithAnswer
}

export interface FieldWithAnswer extends CustomField {
  answer: Answer
}

export type Answer = string | PerPlayerAnswer

export type PerPlayerAnswer = Record<string, PerPlayer>

export type Player = {
  uid: string
  username: string
  firstName: string
  lastName: string
  middleInitial: string
}

export interface PerPlayer extends Player {
  answer: string
}

export type CustomFieldMap = Record<string, CustomField>

export interface ChallongeParticipantResponse {
  participant: ChallongeParticipant
}

export interface ChallongeParticipant {
  active: boolean
  checked_in_at: null
  created_at: string
  final_rank: null
  group_id: null
  icon: null
  id: number
  invitation_id: null
  invite_email: null
  misc: string | null
  name: string
  on_waiting_list: boolean
  seed: number
  tournament_id: number
  updated_at: string
  challonge_username: null
  challonge_email_address_verified: null
  removable: boolean
  participatable_or_invitation_attached: boolean
  confirm_remove: boolean
  invitation_pending: boolean
  display_name_with_invitation_email_address: string
  email_hash: null
  username: null
  attached_participatable_portrait_url: null
  can_check_in: boolean
  checked_in: boolean
  reactivatable: boolean
}

// ============== TEAM

export interface Team {
  id: string
  owner: string
  name: string
  _name: string
  slug: string
  _slug: string
  description: string
  orgId: string
  members: TeamMembers
  admins: string[]
  createdAt: Date
  updatedAt: Date
  isVarsity: boolean
  logo: string
  cover: string
  memberIds: string[]
  shortcode: string
  tournamentRef?: string
}

export interface TeamMember {
  uid: string
  status: TeamMemberStatus
  createdAt: Date
  updatedAt: Date
}

export enum TeamMemberStatus {
  active,
  subtitute,
  inactive,
  removed,
  permanentlyRemoved,
}

export type TeamMembers = Record<string, TeamMember>

export interface WaypointUser {
  displayName: string
  email: string
  photoURL: string
  uid: string
  username: string
  _username?: string
  verified: boolean
  flags: string[]
  //   igns: IGN[];
  photoMain: string
  photoSub: string
  photoHeadshot: string
  firstTimeSetup: boolean
  phoneNumber: string
  phoneNumberFormatted?: string
  isStudent: boolean
  studentYear?: number
  school?: string
  pendingSchoolName?: string
  course?: string
  isWaypointUser?: string
  wasInCollege: boolean
  tags: string[]
  isOrgMember: boolean

  firstName: string
  middleInitial: string
  lastName: string

  //   region: RegionEnum;
  geography: string
  statusText: string
  coverPhoto: string

  teams: string[]

  //   discord?: DiscordUser;
  isVarsity?: boolean
  createdAt: Date
  updatedAt: Date
  verificationExpiry?: Date
}

export interface UserGame {
  code: string
  uid: string
  fields: Record<string, { value: string }>
  show: boolean
  gameId: string
}
