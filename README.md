# be-eignTest


# Library Management System

## Deskripsi Proyek

Proyek ini merupakan implementasi dari sistem manajemen perpustakaan yang dibangun berdasarkan **test case** yang diberikan. Sistem ini dibangun menggunakan **Express** dan **TypeScript**, serta menggunakan **Sequelize** untuk ORM dengan **MySQL** sebagai database. Proyek ini bertujuan untuk memberikan fungsionalitas dasar bagi anggota perpustakaan untuk meminjam dan mengembalikan buku dengan syarat dan ketentuan tertentu.

## Teknologi yang Digunakan

- **Framework**: Express.js
- **Bahasa Pemrograman**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL
- **Dokumentasi API**: Swagger
- **Pengujian**: -

## Fitur Utama

### Entities

1. **Member**:

   - Merepresentasikan anggota perpustakaan yang dapat meminjam buku.
2. **Book**:

   - Merepresentasikan buku yang ada di perpustakaan.

### Use Cases

- **Meminjam Buku**

  - Anggota dapat meminjam buku dengan ketentuan:
    - Anggota tidak boleh meminjam lebih dari 2 buku pada satu waktu.
    - Buku hanya bisa dipinjam oleh satu anggota pada waktu yang sama.
    - Anggota tidak sedang dikenakan penalti.
- **Mengembalikan Buku**

  - Anggota dapat mengembalikan buku dengan ketentuan:
    - Buku yang dikembalikan haruslah buku yang dipinjam oleh anggota tersebut.
    - Jika buku dikembalikan setelah lebih dari 7 hari, anggota akan dikenakan penalti dan tidak dapat meminjam buku selama 3 hari.
- **Memeriksa Buku**

  - Menampilkan semua buku yang ada beserta jumlahnya, tidak termasuk buku yang sedang dipinjam.
- **Memeriksa Anggota**

  - Menampilkan semua anggota yang ada dan jumlah buku yang sedang dipinjam oleh masing-masing anggota.

## Data Palsu (Mock Data)

### Buku

```json
[
    {
        "code": "JK-45",
        "title": "Harry Potter",
        "author": "J.K Rowling",
        "stock": 1
    },
    {
        "code": "SHR-1",
        "title": "A Study in Scarlet",
        "author": "Arthur Conan Doyle",
        "stock": 1
    },
    {
        "code": "TW-11",
        "title": "Twilight",
        "author": "Stephenie Meyer",
        "stock": 1
    },
    {
        "code": "HOB-83",
        "title": "The Hobbit, or There and Back Again",
        "author": "J.R.R. Tolkien",
        "stock": 1
    },
    {
        "code": "NRN-7",
        "title": "The Lion, the Witch and the Wardrobe",
        "author": "C.S. Lewis",
        "stock": 1
    }
]
```
