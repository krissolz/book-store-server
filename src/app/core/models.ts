export interface Book {
    id: string,
    title: string,
    author: string,
    isbn: string,
    price: number,
    description: string,
    image: string
}

export interface Order {
    ids: string[],
    total: number
}

export interface LineItems {
    bookId: string,
    quantity: number
}

export interface FormFields {
    fullName: string,
    address: string,
    city: string,
    zip: string,
    state: string,
    country: string,
    paymentType: number,
    cardName: string,
    cardNumber: number,
    cardExpiry: string,
    cardCVV: number
}

export interface CustomerOrder {
    lineItems: LineItems[]
}

export interface ICustomerOrder extends CustomerOrder, FormFields {
    
}

export interface BooksState {
    booksList: Book[],
    cart: {
        books: Book[],
        order: Order
    }
}