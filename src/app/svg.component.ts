  import {Component,
    Compiler,
    Injector,
    Inject,
    NgModule,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    NgModuleRef,
    AfterViewInit,
    Input
  } from "@angular/core";
  import { FormBuilder } from "@angular/forms";
  
  @Component({
    selector: "svg-query-tool",
    templateUrl: './svg.component.html'
  })
  export class SVGQueryToolComponent implements AfterViewInit {
    cmpRef: any;
    svgCmp:Map<string,any>;
    @Input() src:string;

    @ViewChild("svgpg", { read: ViewContainerRef }) _container: ViewContainerRef;
  
    constructor(
      private fb: FormBuilder,
      private componentFactoryResolver: ComponentFactoryResolver,
      private _compiler: Compiler,
      private _injector: Injector,
      private _m: NgModuleRef<any>
    ) {}
  
    ngAfterViewInit() {
      console.log("stuff")
      let src = "./test.svg";
  
      let svgCmp = this.svgCmp?.get(this.src);
      if(svgCmp){
          this.cmpRef = svgCmp.create(this._injector, [], null, this._m);
          this.cmpRef.instance.name = "B component";
          this._container.insert(this.cmpRef.hostView);
          return;
      }

      @Component({
        templateUrl: "./test.svg",
        styleUrls:['./svg.component.css']
      })
      class tmpCmp {
        constructor(private fb: FormBuilder) {}
      }
  
       const tmpModule = NgModule({ declarations: [tmpCmp] })(class {});
  
      this._compiler
        .compileModuleAndAllComponentsAsync(tmpModule)
        .then(factories => {
          const f = factories.componentFactories[0];
          this.cmpRef = f.create(this._injector, [], null, this._m);
          this.cmpRef.instance.name = "B component";
          this._container.insert(this.cmpRef.hostView);
        });
    }

    // ngAfterViewInit(){

    // }
  }