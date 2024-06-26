import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { MatDialog } from "@angular/material/dialog";
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

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

const MatDialogMock={
    open(){
        return {
            afterClosed:() => of(true)
        };
    }
};

describe('Cart component',() =>{

    let component: CartComponent;
    let fixture : ComponentFixture<CartComponent>;
    let service: BookService;

    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports:[
            HttpClientTestingModule,
            ],
            declarations:[
            CartComponent
            ],
            providers:[
                BookService,
                {
                    provide:MatDialog,useValue:MatDialogMock
                }
            ],
            schemas:[
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    // ngOnInit(): void {
    //     this.listCartBook = this._bookService.getBooksFromCart();
    //     this.totalPrice = this.getTotalPrice(this.listCartBook);
    // }

    //Instancia del componente
    beforeEach(() =>{
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        //OnInit
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        spyOn(service,'getBooksFromCart').and.callFake(() => listBook);
    });

    //Comprobar que el componente se creo correctamentes
    it('should create',() =>{
        expect(component).toBeTruthy();
    });

    it('getTotalPrice returns an amount', ()=>{
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBe(0);
        expect(totalPrice).not.toBeNull();
    })

    
//   public onInputNumberChange(action: string, book: Book): void {
//     const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
//     book.amount = Number(amount);
//     this.listCartBook = this._bookService.updateAmountBook(book);
//     this.totalPrice = this.getTotalPrice(this.listCartBook);
//   }

    it('onInputNumberChange increment correctly',()=>{
        const action = 'plus';
        const book =   {
            name:'',
            author:'',
            isbn:'',
            price: 15,
            amount:2
        };
        
        /*FORMAS DE INSTANCIAR SERVICIO*/
        // const service = (component as any)._bookService;
        // const service2 = component['_bookService'];

        //const service = fixture.debugElement.injector.get(BookService);

        //crear un espia y haz una llamada falsa al servicio
        const spy1 = spyOn(service,'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component,'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(2);

        component.onInputNumberChange(action,book);

        expect(book.amount).toBe(3);
        expect(book.amount === 3).toBeTrue();

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

    });

    
    it('onInputNumberChange decrement correctly',()=>{
        const action = 'minus';
        const book = {
            name:'',
            author:'',
            isbn:'',
            price: 15,
            amount:3
        };
        
        const spy1 = spyOn(service,'updateAmountBook').and.callFake(() => null);
        const spy2 = spyOn(component,'getTotalPrice').and.callFake(() => null);

        expect(book.amount).toBe(3);

        component.onInputNumberChange(action,book);

        expect(book.amount).toBe(2);
        expect(book.amount === 2).toBeTrue();

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

    });

    // public onClearBooks(): void {
    //     if (this.listCartBook && this.listCartBook.length > 0) {
    //       this._clearListCartBook();
    //     } else {
    //        console.log("No books available");
    //     }
    //   }
    
    //   private _clearListCartBook() {
    //     this.listCartBook = [];
    //     this._bookService.removeBooksFromCart();
    //   }

    /*PRUEBA A METODO PRIVADO RECOMENDABLE*/
    it('_onClearBooks works correctly',()=>{
        const spy1 = spyOn((component as any),'_clearListCartBook').and.callThrough();
        const spy2 = spyOn(service,'removeBooksFromCart').and.callFake(() => null);
        component.listCartBook = listBook;
        component.onClearBooks();
        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('_clearListCartBook works correctly',()=>{
        const spy2 = spyOn(service,'removeBooksFromCart').and.callFake(() => null);
        component.listCartBook = listBook;
        component['_clearListCartBook']();

        expect(component.listCartBook.length).toBe(0);
        expect(spy2).toHaveBeenCalled();

    });

    it('The title "The cart is empty" is not displayed when there is a list',()=>{
        component.listCartBook = listBook;
        fixture.detectChanges();
        const debugElement:DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeFalsy();
    });


    it('The title "The cart is empty" is displayed correctly when there list is empty',()=>{
        component.listCartBook = [];
        fixture.detectChanges();
        const debugElement:DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
        expect(debugElement).toBeTruthy();
        if(debugElement){
            const element : HTMLElement = debugElement.nativeElement;
            expect(element.innerHTML).toContain("The cart is empty");
        }
    });

});