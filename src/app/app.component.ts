import { ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router, RoutesRecognized } from '@angular/router';

declare let $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public routes: Route[] = [];
  public currentHoverTabKey!: string;
  public tabs: Tab[] = [];

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    // this.router.config.forEach(element => {
    //   console.log("path===>",element.path)
    // });
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.checkAndAddRouteTab(val);
      }
    });
  }

  //******************* 
  //Toogle Navbar
  //*******************
  ToogleNavBar() {
    $("#header").toggleClass("body-pd");
    $("#nav-bar").toggleClass("show");
    $("#body").toggleClass("body-pd");
    $(".nav_link").removeClass("active");
    $("#header-toggle").toggleClass("bx-x");
    $("#header").toggleClass("header-pd");

  }

  //*****************************
  // Show x when mouse over tabs
  //*****************************
  mouseOverTab(tab: any) {
    this.currentHoverTabKey = tab ? tab.key : null as any;
  }
  //*****************************
  // close the tab by pressing X 
  //*****************************
  deactivateTabs() {
    this.tabs.forEach(tab => (tab.active = false));
  }
  //**********************************
  //  Add Routes and open in new tab 
  //***********************************
  NavigateTo(l: any) {
    this.router.navigateByUrl(l)

    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.checkAndAddRouteTab(val);
      }
    });
  }
  //************************************************
  // Check and add the component and show it in tab
  //*************************************************
  checkAndAddRouteTab(val: RoutesRecognized) {

    // get the component to activate by the route
    const comp: any = val.state.root.firstChild?.component;

    // deactivate all tabs
    this.deactivateTabs();

    // check if the tab to be activated is already existing
    if (this.tabs.find(tab => tab.name == comp["name"]) == null) {

      // if not, push it into the tab array
      this.tabs.push({
        name: comp["name"],
        component: comp,
        key: comp["name"],
        active: true,
        route: val.state.root.firstChild?.routeConfig,
        count: 1
      });

    } else {
      // if the tab exists, activate it
      const tabToActivate = this.tabs.find(tab => tab.name == comp["name"]);
      if (tabToActivate) {
        tabToActivate.active = true;
      }
    }

    this.cd.markForCheck();
  }

  //****************************************
  // Pusht the route to the routes array
  //***************************************
  CheckAndAddRoutes(e: string) {

    // listen to routing change event to attach new tabs or activate a new one
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.checkAndAddRouteTab(val);
      }
    });
  }

  //****************************************
  // Close Tab
  //****************************************
  disposeTab(tab: Tab) {
    debugger
    if (this.tabs.length > 1) {
      this.tabs = this.tabs.filter(item => item.key !== tab.key);

      if (tab.active) {
        // deactivate all tabs
        this.deactivateTabs();
        const rout = this.tabs[this.tabs.length - 1].route.path;
        this.router.navigateByUrl('/' + rout)

      }
    }
  }

}




export interface Tab {
  name: string;
  component: any;
  active: boolean;
  route: any;
  key: string;
  count: number
}