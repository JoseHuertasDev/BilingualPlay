import { Component, OnInit } from '@angular/core';
import { Language } from '../Models/language';
import {LANGUAGES} from './Languages';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {
  languageList : Language[] =  LANGUAGES;
  constructor() {
  }

  ngOnInit(): void {
  }

}
