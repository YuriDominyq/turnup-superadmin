export type Company = {
  id: number;
  name: string;
  route: string;
  terminal: string;
};

let companies: Company[] = [
  {
    id: 1,
    name: "Granada - Burgos Jeep Terminal",
    route: "Granada - Burgos",
    terminal: "Granada Terminal",
  },
  {
    id: 2,
    name: "Metro Bacolod JTC",
    route: "Mand. - Shopping - La Salle",
    terminal: "Mandalagan Terminal",
  },
  {
    id: 3,
    name: "South Bacolod JTC",
    route: "Alijis - Libertad",
    terminal: "Alijis Terminal",
  },
  {
    id: 4,
    name: "Bacolod Transport Cooperative",
    route: "Bata - Libertad",
    terminal: "Bata Terminal",
  },
];

export async function getCompanies(): Promise<Company[]> {
  return companies;
}

export async function createCompany(newCompany: Company): Promise<void> {
  companies.push(newCompany);
}

export async function updateCompany(
  id: number,
  updateData: Partial<Company>
): Promise<void> {
  companies = companies.map((company) =>
    company.id === id ? { ...company, ...updateData } : company
  );
}

export async function deleteCompany(id: number): Promise<void> {
  companies = companies.filter((company) => company.id !== id);
}
