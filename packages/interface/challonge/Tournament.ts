export interface TournamentResponse {
  tournament: TournamentInterface
}

export type TournamentInterface = {
  accept_attachments?: boolean
  allow_participant_match_reporting?: boolean
  anonymous_voting?: boolean
  category?: string
  check_in_duration?: number // in minutes
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
  pts_for_bye?: number
  pts_for_game_tie?: number
  pts_for_game_win?: number
  pts_for_match_tie?: number
  pts_for_match_win?: number
  quick_advance?: boolean
  ranked_by?: "match wins" | "game wins" | "points scored" | "points difference"
  require_score_agreement?: boolean
  rr_pts_for_game_tie?: number
  rr_pts_for_game_win?: number
  rr_pts_for_match_tie?: number
  rr_pts_for_match_win?: number
  sequential_pairings?: boolean
  show_rounds?: boolean
  signup_cap?: null
  start_at?: Date | null
  started_at?: Date | null
  started_checking_in_at?: String | null
  state?: string
  swiss_rounds?: number
  teams?: boolean
  tie_breaks?: string[]
  tournament_type?: TournamentType
  updated_at?: string
  url?: string
  description_source?: string
  subdomain?: string
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
  grand_finals_modifier?: "single or double match" | "single match" | "skip"
}

export enum TournamentType {
  single = "single elimination",
  double = "double elimination",
  roundRobin = "round robin",
  swiss = "swiss",
}
