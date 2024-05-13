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
});