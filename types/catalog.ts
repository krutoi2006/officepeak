export interface Category { id: string; name: string; slug: string; image: string }
export interface Product { id: string; name: string; article: string; categoryId: string; price: number; oldPrice?: number; image: string; isNew: boolean; inStock: boolean; colors: string[] }
export interface CartItem extends Product { quantity: number; selectedColor: string }
