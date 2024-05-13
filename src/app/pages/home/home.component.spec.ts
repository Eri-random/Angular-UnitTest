import { BookService } from "src/app/services/book.service";
import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { of, pipe } from "rxjs";

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

const bookServiceMock={
    getBooks : () => of(listBook),
}

@Pipe({name:'reduceText'})
class ReduceTextPipeMock implements PipeTransform{
    transform():string {
        return '';
    }
}

describe('Home component',() =>{

    let component: HomeComponent;
    let fixture : ComponentFixture<HomeComponent>;
    let service: BookService;

    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports:[
            HttpClientTestingModule
            ],
            declarations:[
            HomeComponent,
            ReduceTextPipeMock
            ],
            providers:[
                //BookService
                /*MOCKEAR SERVICE*/
                {
                    provide:BookService,
                    useValue:bookServiceMock
                }
            ],
            schemas:[
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    //Instancia del componente
    beforeEach(() =>{
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        //OnInit
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
    });

    //Comprobar que el componente se creo correctamentes
    it('should create',() =>{
        expect(component).toBeTruthy();
    });

    it('getBooks get books from the subscription', ()=>{
        //const spy1 = spyOn(service,'getBooks').and.returnValue(of(listBook))
        //debugger;
        component.getBooks();
        //expect(spy1).toHaveBeenCalled();
        expect(component.listBook.length).toBe(3);
    });

});