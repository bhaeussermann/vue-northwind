import { Dependencies } from '@/decorators/dependencies';
import { ErrorService } from '@/services/error-service';
import { Vue, Component } from 'vue-property-decorator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component
export default class ErrorAlert extends Vue {
  errorMessage = '';
  show = false;

  private unmount = new Subject();

  @Dependencies() private errorService!: ErrorService;
  
  mounted() {
    this.errorService.showError
      .pipe(takeUntil(this.unmount))
      .subscribe(e => {
        this.errorMessage = e;
        this.show = true;
      });
  }

  unmounted() {
    this.unmount.next();
    this.unmount.complete();
  }
}
