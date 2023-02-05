import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';


export interface PeriodicElement {
  firstName: string;
  id: number;
  adress: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent {
  filter: String = '';
  public users: any = [];

  
  ELEMENT_DATA: PeriodicElement[] = [];
  

  displayedColumns: string[];

  dataSource!: MatTableDataSource<PeriodicElement> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private title: Title, private dataService: DataService, public authService: AuthService) {
    this.title.setTitle("Users");

    /*
    this.http.get('http://localhost:3000/users').subscribe((data: any) => {
      this.ELEMENT_DATA = data;
    });
    */

    this.dataService.getAllUsers().subscribe((data: any) => {
      console.log(data)
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
    });
    this.displayedColumns = this.authService.isAdminLoggedIn() ? ['id', 'firstName', 'lastName', 'email', 'adress', 'manage']: ['id', 'firstName', 'lastName', 'email', 'adress'];
    
    

  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }

  delete(id: any) {
    this.dataService.deleteUser(id.toString()).subscribe((data: any) => {
      console.log(data);
      this.dataService.getAllUsers().subscribe((data: any) => {
        console.log(data)
        this.ELEMENT_DATA = data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      });
    });
  }

  update(user: any) {

    this.dataService.updateUserData(user._id, user).subscribe((data: any) => {
      console.log(data);
      this.dataService.getAllUsers().subscribe((data: any) => {
        console.log(data)
        this.ELEMENT_DATA = data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      });
    }
    );
    
  }


  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
}
