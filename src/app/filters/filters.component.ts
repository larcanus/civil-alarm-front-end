import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiltersModel } from '../core/models/filters.model';
import { UserService } from '../core/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiltersService } from '../core/services/filters.service';
import { Errors } from "../core/models";

@Component( {
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: [ './filters.component.scss' ]
} )
export class FiltersComponent implements OnInit {
  filters: FiltersModel | undefined;
  filterForm: FormGroup;
  isActive_1: boolean;
  isActive_2: boolean;
  subjectList: string[];
  errors: Errors = { errors: {} };
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private filtersService: FiltersService,
  ) {
    this.isActive_1 = false;
    this.isActive_2 = false;
    this.filterForm = this.fb.group( {
      'filter_first': '',
      'filter_second': '',
      'subjects_first': 'Все субъекты',
      'subjects_second': 'Все субъекты',
    } );
    this.subjectList = [ 'Все субъекты',
      'Республика Адыгея', 'Республика Башкортостан', 'Республика Бурятия', 'Республика Алтай',
      'Республика Дагестан', 'Республика Ингушетия', 'Кабардино-Балкарская Республика', 'Республика Калмыкия',
      'Карачаево-Черкесская Республика', 'Республика Карелия', 'Республика Коми',
      'Республика Марий Эл', 'Республика Мордовия', 'Республика Саха (Якутия)',
      'Республика Северная Осетия - Алания', 'Республика Татарстан (Татарстан)', 'Республика Тыва',
      'Удмуртская Республика', 'Республика Хакасия', 'Чеченская Республика',
      'Чувашская Республика - Чувашия', 'Алтайский край', 'Краснодарский край', 'Красноярский край',
      'Приморский край', 'Ставропольский край', 'Хабаровский край', 'Амурская область',
      'Архангельская область', 'Астраханская область', 'Белгородская область', 'Брянская область',
      'Владимирская область', 'Волгоградская область', 'Вологодская область', 'Воронежская область',
      'Ивановская область', 'Иркутская область', 'Калининградская область', 'Калужская область',
      'Камчатский край', 'Кемеровская область - Кузбасс', 'Кировская область', 'Костромская область',
      'Курганская область', 'Курская область', 'Ленинградская область', 'Липецкая область', 'Магаданская область',
      'Московская область', 'Мурманская область', 'Нижегородская область', 'Новгородская область',
      'Новосибирская область', 'Омская область', 'Оренбургская область', 'Орловская область',
      'Пензенская область', 'Пермский край', 'Псковская область', 'Ростовская область', 'Рязанская область',
      'Самарская область', 'Саратовская область', 'Сахалинская область', 'Свердловская область', 'Смоленская область',
      'Тамбовская область', 'Тверская область', 'Томская область', 'Тульская область', 'Тюменская область',
      'Ульяновская область', 'Челябинская область', 'Забайкальский край', 'Ярославская область', 'город Москва',
      'город Санкт-Петербург', 'Еврейская автономная область', 'Ненецкий автономный округ',
      'Ханты-Мансийский автономный округ - Югра', 'Чукотский автономный округ', 'Ямало-Ненецкий автономный округ',
      'Республика Крым', 'город Севастополь',
    ];
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        if ( data[ 'filters' ] && data[ 'filters' ].length ) {
          this.filters = data[ 'filters' ][ 0 ];
          this.fillFormFilters();
        }
        this.cd.markForCheck();
      }
    );
  }

  fillFormFilters() {
    this.filterForm.setValue( {
      'filter_first': this.filters?.[ 'filter_1' ] || '',
      'filter_second': this.filters?.[ 'filter_2' ] || '',
      'subjects_first': this.filters?.[ 'subject_1' ] === '' ? 'Все субъекты' : this.filters?.[ 'subject_1' ],
      'subjects_second': this.filters?.[ 'subject_2' ] === '' ? 'Все субъекты' : this.filters?.[ 'subject_2' ],
    } );

    this.isActive_1 = this.filters?.[ 'active_1' ] || false;
    this.isActive_2 = this.filters?.[ 'active_2' ] || false;
  }

  onChangeActiveFilter( { target }: any ) {
    const { id, checked } = target
    // @ts-ignore
    this[ id ] = checked;
  }

  onSubmitFormFilter() {
    this.errors = { errors: {} };
    const formData = this.filterForm.value;

    let filtersBody = new Object( {
      'name_1': 'Фильтр №1',
      'filter_1': formData[ 'filter_first' ],
      'subject_1': formData[ 'subjects_first' ] === 'Все субъекты' ? '' : formData[ 'subjects_first' ],
      'active_1': this.isActive_1,
      'name_2': 'Фильтр №2',
      'filter_2': formData[ 'filter_second' ],
      'subject_2': formData[ 'subjects_second' ] === 'Все субъекты' ? '' : formData[ 'subjects_second' ],
      'active_2': this.isActive_2,
    } );

    this.filtersService
      .update( filtersBody )
      .subscribe(
        data => {
          Object.assign( this.filters, data )
          this.filterForm.patchValue( data );
          this.isSubmitting = true;
          this.cd.markForCheck();
        },
        err => {
          this.errors = { errors: { [ '' ]: `${ err.message }` } };
          this.isSubmitting = false;
          this.cd.markForCheck();
        } );
  }
}
