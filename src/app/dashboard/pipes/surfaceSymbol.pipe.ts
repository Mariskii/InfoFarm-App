import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surfaceSymbol',
  standalone: true
})
export class SurfaceSymbolPipe implements PipeTransform {

  transform(typeSurface: string): unknown {
    return typeSurface === 'HECTARE' ? 'ha' : 'm²';
  }

}
