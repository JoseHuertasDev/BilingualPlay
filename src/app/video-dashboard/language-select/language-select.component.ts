import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Language } from '../../Models/language';
import {LANGUAGES} from './Languages';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {
  languageList : Language[] =  LANGUAGES;
  @Input() bindingLanguage!: Language;
  selectedLanguage: Language;
  constructor() {
    this.selectedLanguage = new Language();
  }
  onSelect(): void{
    this.bindingLanguage.code = this.selectedLanguage.code;
    this.bindingLanguage.code = this.selectedLanguage.name;
  }
  ngOnInit(): void {
  }

}
