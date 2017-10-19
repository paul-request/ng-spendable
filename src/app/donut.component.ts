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
  textOffset: number;
  radius: number;
  arc: any;
  donutWidth: number;
  animationDuration: number;
  tau: number;

  constructor(
    private element: ElementRef
  ) {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.element.nativeElement);

    this.tau = 2 * Math.PI;
    this.animationDuration = 1000;
    this.width = 150;
    this.height = 150;
    this.textOffset = 50;
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

    const g = svg.append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    const background = g.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', this.width / 2)
      .attr('class', 'chart__bg')

    if (!this.data.percent) {
      background.attr('class', 'chart__bg--default');
    }

    const backgroundArc = g.append('path')
      .datum({ endAngle: this.tau })
      .attr('class', 'chart__arc--bg')
      .attr('d', this.arc);

    this.foreground = g.append('path')
      .datum({ endAngle: 0 })
      .attr('class', 'chart__arc--fg')
      .attr("d", this.arc);

    this.percentText = g.append('text')
      .attr('dy', '-0.5em')
      .attr('class', 'chart__value')
      .attr('text-anchor', 'middle')
      .text((d) => `${this.data.percent}%`);

    // TODO: need to work out how to wrap text? Split words into tspans perhaps?
    this.labelText = g.append('foreignObject')
      .attr('dy', '0.5em')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.width - this.textOffset)
      .attr('height', this.height - this.textOffset)
      .attr('transform', `translate(-${this.textOffset},0)`)
      .append('xhtml:div')
      .attr('style', 'text-align: center; font-size: 0.875rem; line-height: 1rem;')
      .text((d) => `${this.data.label}`);
      // .text((d) => `${this.data.label}`);

    // this.data.label.split(' ').forEach(word => {
    //   this.labelText.append('tspan')
    //     .text(`${word} `);
    // });

    this.foreground
      .transition()
      .duration(750)
      .attrTween('d', this.arcTween(endAngle));
  }

  ngOnChanges(changes): void {
    this.render();
  }
}
