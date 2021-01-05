import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Dialog extends Vue {
  show = false;
  title: string | null = null;
  message: string | null = null;

  private resolve!: Function;

  open(title: string, message: string): Promise<boolean> {
    this.show = true;
    this.title = title;
    this.message = message;
    return new Promise<boolean>(r => this.resolve = r);
  }

  confirm() {
    this.show = false;
    this.resolve(true);
  }

  cancel() {
    this.show = false;
    this.resolve(false);
  }
}
