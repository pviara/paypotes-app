import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Injectable()
export class ConfettiService {
    private document = inject(DOCUMENT);

    pan(): void {
        const canvas = this.createCanvas();
        confetti.create(canvas, { resize: true })({
            spread: this.randomInRange(50, 70),
            particleCount: this.randomInRange(100, 230),
            origin: {
                x: 0.5,
                y: 0.5,
            },
            colors: ['#6717cd', '#2871fa'],
            gravity: 0.7,
        });

        setTimeout(() => this.removeCanvas(canvas), 10000);
    }

    private createCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '999999';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);
        return canvas;
    }

    private removeCanvas(canvas: HTMLCanvasElement): void {
        this.document.body.removeChild(canvas);
    }

    private randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}
