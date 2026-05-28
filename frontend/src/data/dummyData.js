export const dummyCategories = [
  {
    id_category: 1,
    category_name: "Novel",
  },
  {
    id_category: 2,
    category_name: "Technology",
  },
  {
    id_category: 3,
    category_name: "Education",
  },
];

export const dummyMembers = [
  {
    id_member: 1,
    name: "Muhammad Zaidan Nabih",
    address: "Indonesia",
    phone_number: "081234567890",
    email: "zaidan@example.com",
  },
  {
    id_member: 2,
    name: "Irafah Astrid Saphira",
    address: "Indonesia",
    phone_number: "081234567891",
    email: "irafah@example.com",
  },
  {
    id_member: 3,
    name: "Fitri Nur Jannah",
    address: "Indonesia",
    phone_number: "081234567892",
    email: "fitri@example.com",
  },
];

export const dummyBooks = [
  {
    id_book: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    publisher: "Bentang Pustaka",
    publication_year: 2005,
    stock: 7,
    id_category: 1,
    category_name: "Novel",
  },
  {
    id_book: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    publisher: "Prentice Hall",
    publication_year: 2008,
    stock: 4,
    id_category: 2,
    category_name: "Technology",
  },
  {
    id_book: 3,
    title: "Dasar-Dasar Basis Data",
    author: "Abdul Kadir",
    publisher: "Andi Publisher",
    publication_year: 2019,
    stock: 10,
    id_category: 3,
    category_name: "Education",
  },
];

export const dummyBorrowings = [
  {
    id_borrowing: 1,
    id_member: 1,
    member_name: "Muhammad Zaidan Nabih",
    id_book: 1,
    book_title: "Laskar Pelangi",
    borrowing_date: "2026-05-28",
    return_deadline: "2026-06-04",
    return_date: null,
    status: "Dipinjam",
  },
  {
    id_borrowing: 2,
    id_member: 2,
    member_name: "Irafah Astrid Saphira",
    id_book: 2,
    book_title: "Clean Code",
    borrowing_date: "2026-05-20",
    return_deadline: "2026-05-27",
    return_date: "2026-05-25",
    status: "Dikembalikan",
  },
];