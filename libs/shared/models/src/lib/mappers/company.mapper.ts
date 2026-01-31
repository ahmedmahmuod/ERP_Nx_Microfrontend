/**
 * Company Mapper
 * Maps between CompanyDto and Company domain model
 */

import { CompanyDto } from '../api/common/company.dto';
import { Company } from '../domain/company.model';

export function mapCompanyDtoToCompany(dto: CompanyDto): Company {
  return {
    id: dto.ID.toString(),
    name: dto.Name,
    logo: dto.Logo || dto.profileImage || undefined,
    description: dto.Location || undefined,
    status: dto.IsDeleted ? 'inactive' : 'active',
  };
}

export function mapCompanyDtosToCompanies(dtos: CompanyDto[]): Company[] {
  return dtos.map(mapCompanyDtoToCompany);
}
