// src/components/Forms.ts
import $ from 'jquery';
import 'jquery-selectric';

export class Forms {
    static init() {
        if (typeof document !== 'undefined') {
            $(document).ready(() => {
                ($('.select-option')as any).selectric();
            });
        }
    }
}
