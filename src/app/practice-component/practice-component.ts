import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-practice-component',
  standalone: false,
  templateUrl: './practice-component.html',
  styleUrl: './practice-component.css',
})
export class PracticeComponent {
  // useForm = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   email: new FormControl('', [Validators.email, Validators.required]),
  //   password: new FormControl(''),
  // });
  // public onSubmit() {
  //   if (this.useForm.valid) {
  //     console.log('form is valid');
  //   } else {
  //     console.log('form is invalid');
  //   }
  //   console.log(this.useForm.value);
  //   this.useForm.reset();
  // }
  // name = new FormControl('');
  // public onSubmit() {
  //   console.log(this.name.value);
  // }

  user = {
    name: '',
    email: '',
    password: '',
  };
  // public onSubmit(form: any) {
  //   console.log(form.value);
  // }
  public onSubmit() {
    console.log(this.user);
  }
  userName = '';
  public onChange(value: string) {
    this.userName = value;
  }
}
