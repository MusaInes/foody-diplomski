import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, Grid, GridOptions } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public gridModel: any[] = []

  actionCellRenderer = (params: any, user: any) => {
    if (!user.isAdmin) return;
    let eGui = document.createElement("div");
    if (user.email === params.node.data.user.email) {
      eGui.innerHTML = `<button type="button" class="btn btn-danger btn-sm" disabled>Obriši</button>`;
    }
    else {
      eGui.innerHTML = `<button type="button" class="btn btn-danger btn-sm" data-action="delete">Obriši</button>`;
    }

    return eGui;
  }

  public gridOptions: GridOptions = {
    onGridReady: (event) => { event.api.sizeColumnsToFit() },
    onCellClicked: (event) => this.onCellClicked(event),
    suppressRowTransform: true,
		editType: "fullRow",
  } as GridOptions

  public columnDefs: ColDef[] = [
    { field: 'user.email', sortable: true, filter: true },
    { field: 'age', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'gender', sortable: true, filter: true },
    { field: 'createdAt', sortable: true, filter: true },
    {
      headerName: "Action",
      minWidth: 150,
      cellRenderer: (params: any) => this.actionCellRenderer(params, this.user.user),
      editable: false,
      colId: "action",
      cellClass: 'overflow-visible'
    }
  ];

  constructor(private http: HttpClient, private user: UserService) { }

  ngOnInit(): void {
  }

  getCurrentUser() {
    return this.user.user;
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getAllUsers();
  }

  async getAllUsers(): Promise<void> {
    this.gridModel = await this.http.get<any>('http://localhost:4000/api/profile').toPromise()
  }


	onCellClicked(params: any) {
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;
			if (action === "delete") {
        if(window.confirm('Da li zaista želiš obrisati korisnika?')) {
          this.deleteUser(params);
        }
			}
		}
	}

  deleteUser(params: any) {
    const user = params.node.data.user;
    this.http.delete<any>(`http://localhost:4000/api/profile/${user._id}`).subscribe((response: any) => {
      this.getAllUsers();
    })

  }

  // onRowEditingStarted(params: any) {
  //   params.api.refreshCells({
  //     columns: ["action"],
  //     rowNodes: [params.node],
  //     force: true
  //   });
  // }

  // onRowEditingStopped(params: any) {
  //   params.api.refreshCells({
  //     columns: ["action"],
  //     rowNodes: [params.node],
  //     force: true
  //   });
  // }

  onBtnClick(event: any) {
    console.log(event);

  }

}
