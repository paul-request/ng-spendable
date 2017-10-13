import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Donut } from './donut';
import { CONSTANTS } from './constants';
import * as D3 from 'd3/index';

@Component({
  selector: 'donut',
  template: '<ng-content></ng-content>',
  styles: []
})
export class DonutComponent implements OnChanges {
  @Input() data: Donut;
  @Input() total: number;

  htmlElement: HTMLElement;
  host: any;
  percentText: any;
  labelText: any;
  foreground: any;
  width: number;
  height: number;
  radius: number;
  arc: any;
  donutWidth: number;
  animationDuration: number;
  tau: number;
  dataset: Donut[];

  constructor(
    private element: ElementRef
  ) {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.element.nativeElement);

    this.tau = 2 * Math.PI;
    this.animationDuration = 1000;
    this.width = 150;
    this.height = 150;
    this.radius = Math.min(this.width, this.height) / 2;
    this.donutWidth = 8;
    this.arc = D3.arc()
      .innerRadius(this.radius - this.donutWidth)
      .outerRadius(this.radius)
      .startAngle(0);
  }

  arcTween(angle: number): any {
    return (d) => {
      var interpolate = D3.interpolate(d.endAngle, angle);

      return (t) => {
        d.endAngle = interpolate(t);

        return this.arc(d);
      }
    }
  }

  render(): void {
    const endAngle = (this.data.percent / 100) * this.tau;

    const svg = this.host.append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const g = svg.append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

    const background = g.append("path")
      .datum({ endAngle: this.tau })
      .attr('class', 'chart-bg')
      .attr("d", this.arc);

    this.foreground = g.append("path")
      .datum({ endAngle: 0 })
      .attr('class', 'chart-fg')
      .attr("d", this.arc);

    this.percentText = g.append('text')
      .attr('dy', '-0.75em')
      .attr('class', 'chart-percent')
      .attr('text-anchor', 'middle')
      .text((d) => `${this.data.count}`);

    this.labelText = g.append('text')
      .attr('dy', '0.75em')
      .attr('class', 'chart-label')
      .attr('text-anchor', 'middle')
      .text((d) => `${this.data.label}`);

    this.foreground
      .transition()
      .duration(750)
      .attrTween('d', this.arcTween(endAngle));
  }

  update(): void {
    const endAngle = (this.data.percent / 100) * this.tau;

    this.percentText.text((d) => `${this.data.count}`);
    this.foreground.attrTween('d', this.arcTween(endAngle));
  }

  ngOnChanges(changes): void {
    this.render();
  }
}
