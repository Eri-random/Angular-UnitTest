import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from "./book.service"
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";

const listBook:Book[]=[
    {
      name:'',
      author:'',
      isbn:'',
      price: 15,
      amount:2
    },
    {
        name:'',
        author:'',
        isbn:'',
        price: 20,
        amount:1
      },
      {
        name:'',
        author:'',
        isbn:'',
        price: 8,
        amount:7
      }
]

    const book:Book = {
        name:'',
        author:'',
        isbn:'',
        price: 15,
        amount:2
    }

describe('BookService',() =>{
    let service: BookService;
    let httpMock : HttpTestingController;
    let storage : {};

    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule,
            ],
            providers:[
                BookService
            ],
            schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(()=>{
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
        storage = {};
        spyOn(localStorage, 'getItem').and.callFake ( (key: string) => {
            return storage[key] ? storage[key] : null;
        });
        spyOn(localStorage, 'setItem').and.callFake ( (key: string, value:string) => {
            return storage[key] = value;
        });
    
    });

    afterEach(() =>{
        httpMock.verify();
    });

    it('should be create',() => {
        expect(service).toBeTruthy();
    });

    // public getBooks(): Observable<Book[]> {
    //     const url: string = environment.API_REST_URL + `/book`;
    //     return this._httpClient.get<Book[]>(url);
    //   }

    it('getBooks return a list of book and does a get method',() =>{
        service.getBooks().subscribe((resp: Book[])=>{
            expect(resp).toEqual(listBook);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`)
        expect(req.request.method).toBe('GET');
        //Simular el request
        req.flush(listBook);
    });

    // public getBooksFromCart(): Book[] {
    //     let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    //     if (listBook === null) {
    //       listBook = [];
    //     }
    //     return listBook;
    //   }

    it('getBooksFromCart retrun empty array when localstorage is empty',() =>{
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });

    // public addBookToCart(book: Book) {
    //     let listBook: Book[] = JSON.parse(localStorage.getItem('listCartBook'));
    //     if (listBook === null) { // Create a list with the book
    //       book.amount = 1;
    //       listBook = [ book ];
    //     } else { 
    //       const index = listBook.findIndex((item: Book) => {
    //         return book.id === item.id;
    //       });
    //       if (index !== -1) { // Update the quantity in the existing book
    //         listBook[index].amount++;
    //       } else { 
    //         book.amount = 1;
    //         listBook.push(book);
    //       }
    //     }
    //     localStorage.setItem('listCartBook', JSON.stringify(listBook));
    //     this._toastSuccess(book);
    //   }

    it('addBookToCart when the list does not exist in the localstorage ',() =>{
        const toast ={
            fire:() => null
        } as any;
        const spy1 = spyOn(Swal,'mixin').and.callFake(() =>{
            return toast;
        })
        service.addBookToCart(book);
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);
        expect(spy1).toHaveBeenCalled();
    });

    // public removeBooksFromCart(): void {
    //     localStorage.setItem('listCartBook', null);
    //   }

    it('removeBooksFromCart removes the list from localStorage',()=>{
        service.addBookToCart(book);
        let listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(1);

        service.removeBooksFromCart();
        listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    })
})