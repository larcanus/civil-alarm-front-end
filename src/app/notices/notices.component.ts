import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NoticesModel } from "../core/models/notices.model";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component( {
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: [ './notices.component.scss' ],
  animations: [
    trigger( 'detailExpand', [
      state( 'collapsed', style( { height: '0px', minHeight: '0' } ) ),
      state( 'expanded', style( { height: '*' } ) ),
      transition( 'expanded <=> collapsed', animate( '225ms cubic-bezier(0.4, 0.0, 0.2, 1)' ) ),
    ] ),
  ],
} )
export class NoticesComponent implements OnInit {
  dataSource: NoticesModel[];
  displayedColumns: any[] = [ 'id', 'filter_name', 'created_at', 'doc_count' ];
  displayedColumnsTranslate: any = {
    'id': '#',
    'filter_name': 'фильтр',
    'created_at': 'дата и время',
    'doc_count': 'результат'
  };
  expandedElement: NoticesModel[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.validateNotices( data[ 'notices' ] );
        this.cd.markForCheck();
      }
    );
  }

  validateNotices( notices: any[] ) {
    notices.forEach( ( notice, key ) => {
      if ( notice.documents === '' ) {
        notice.doc_count = 'ничего не найдено';
      } else {
        notice.results = JSON.parse( notice.documents );
        notice.doc_count = this.getNumberDocs( JSON.parse( notice.documents ) );
      }
      notice.created_at = new Date( Date.parse( notice.created_at ) ).toLocaleString();
      notice.id = String( key + 1 );
    } );

    this.dataSource = notices;
  }

  getNumberDocs( documents: any[] | object[] ): string {
    let docCount = 0;
    documents.forEach( doc => {
      if ( doc.name ) {
        docCount++;
      }
    } );
    return `количество совпадений: ${ docCount }`;
  }

  goToGAS(): void {
    window.open( 'https://bsr.sudrf.ru/bigs/portal.html', '_blank' );
  }
}
