import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
  @Prop()
  label!: string;
  @Prop()
  value!: Date | null;

  displayString = '';
  isDisplayingDatePicker = false;

  get dateString(): string {
    const dateString = this.value?.toLocaleDateString('en-ZA', { year: 'numeric', month: 'numeric', day: 'numeric' }) ?? '';
    return dateString.replaceAll('/', '-');
  }
  set dateString(newDateString: string) {
    const dateMillis = Date.parse(newDateString);
    this.$emit('input', isNaN(dateMillis) ? null : new Date(dateMillis));
  }

  mounted() {
    this.refreshDisplayString();
  }

  @Watch('value')
  handleDateChanged() {
    this.refreshDisplayString();
  }

  handleBlur(e: FocusEvent) {
    this.applyDisplayString();

    const newFocusedElement = e.relatedTarget as any;
    if (newFocusedElement.closest) {
      const isDatePickerFocused = !!newFocusedElement.closest('.date-picker');
      if (!isDatePickerFocused) this.isDisplayingDatePicker = false;
    }
  }

  private refreshDisplayString() {
    this.displayString = this.value?.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }) ?? '';
  }
  
  private applyDisplayString() {
    if (!this.displayString) {
      this.$emit('input', null);
    }
    else {
      const dateMillis = Date.parse(this.displayString);
      if (!isNaN(dateMillis)) this.$emit('input', new Date(dateMillis));
      else this.refreshDisplayString();
    }
  }
}
