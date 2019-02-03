import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validateArrayFor'
})
export class ValidateArrayForPipe implements PipeTransform {

  transform(value: any): any {
    console.log('mostrando pipe');
    // console.log(value);
for ( let i = 0; i < value.length; i++) {
    console.log(value[i].consultor);
    if ( value[i].consultor === value[i + 1].consultor) {
      console.log('son iguales');
        break;
    } else {
      return true;
    }
}
    return null;
  }

}
