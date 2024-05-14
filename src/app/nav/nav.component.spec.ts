import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NavComponent } from "./nav.component"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"
import {RouterTestingModule} from '@angular/router/testing'

class ComponentTestRoute {}

describe('Nav component',()=>{
    let component: NavComponent
    let fixture: ComponentFixture<NavComponent> 

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                RouterTestingModule.withRoutes([
                    {path:'home', component:ComponentTestRoute},
                    {path:'cart',component: ComponentTestRoute}
                ])
            ],
            declarations:[
                NavComponent
            ],
            providers:[],
            schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(()=>{
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Should create',() =>{
        expect(component).toBeTruthy();
    })
});