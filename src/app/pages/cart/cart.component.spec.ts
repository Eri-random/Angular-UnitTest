import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { BookService } from "src/app/services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
  
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

describe('Cart component',() =>{

    let component: CartComponent;
    let fixture : ComponentFixture<CartComponent>;
    let service: BookService;

    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports:[
            HttpClientTestingModule
            ],
            declarations:[
            CartComponent
            ],
            providers:[
                BookService
            ],
            schemas:[
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    //Instancia del componente
    beforeEach(() =>{
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        //OnInit
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
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

});