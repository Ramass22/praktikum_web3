const db = require('../config/database');
const ProdukModel = {
    // Mengambil seluruh data produk secara asinkronus
    getAll: async () => {
        // db.query mengembalikan array: [rows, fields]
        const [rows] = await db.query('SELECT * FROM produk1 ORDER BY id DESC');
        return rows;
    },
    create: async (data) => {
        const sql = `
INSERT INTO produk1 (id, nama_produk, kategori, harga, stok)
VALUES (?,?, ?, ?, ?)
`;
        // Eksekusi query dengan parameter array terurut sesuai letak placeholder '?'
        const [result] = await db.query(sql, [
            data.id,
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok
        ]);
        return result;
    },
    // Mengambil 1 record spesifik berdasarkan Primary Key (id) 
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM produk1 WHERE id = ?', [id]);
        return rows[0]; // Mengembalikan objek tunggal atau undefined 
    },
    // Memperbarui record produk berdasarkan id 
    update: async (id, data) => {
        const sql = `
UPDATE produk1
SET nama_produk = ?, kategori = ?, harga = ?, stok = ?
WHERE id = ?
`;
        const [result] = await db.query(sql, [
            data.nama_produk,
            data.kategori,
            data.harga,
            data.stok,
            id
        ]);
        return result;
    },
    // Menghapus data produk berdasarkan id 
    delete: async (id) => {
        const sql = 'DELETE FROM produk1 WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },
    getByKategoriInsecure: async (kategoriInput) => {
        // Konkatenasi langsung (SANGAT RENTAN!)
        const rawSql = `SELECT * FROM produk WHERE kategori = '${kategoriInput}'`;
        console.log('\n[RAW VULNERABLE SQL QUERY]:', rawSql);
        const [rows] = await db.query(rawSql);
        return rows;
    },
    // METODE AMAN MENGGUNAKAN PREPARED STATEMENT 
    getByKategoriSecure: async (kategoriInput) => {
        const secureSql = 'SELECT * FROM produk1 WHERE kategori = ?';
        console.log('\n[PREPARED STATEMENT QUERY]:', secureSql, 'WITH VALUE:', [kategoriInput]);
        const [rows] = await db.query(secureSql, [kategoriInput]);
        return rows;
    }
};


module.exports = ProdukModel;