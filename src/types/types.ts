export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type DataContacts = {
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  results: Contact[];
};

export type DataContactsPost = {
  firstName: string;
  lastName: string
  email: string
  phone: number
};

export type Links = {
  label: string;
  path: string;
}
