/**
 * Company DTO
 * API contract for company data from backend
 */

export interface CompanyDto {
  readonly ID: number;
  readonly Name: string;
  readonly Phone: string;
  readonly Email: string;
  readonly Location: string;
  readonly Logo: string | null;
  readonly profileImage: string | null;
  readonly EntityID: number;
  readonly IsDeleted: boolean;
  readonly CreatedBy: number;
  readonly CreatedDateTime: string;
  readonly DeletedBy: number | null;
  readonly DeletedDateTime: string | null;
  readonly HistoryKey: string | null;
  readonly CompanyID: number | null;
  readonly AccountID: number;
}
