import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  title: string;
  constructor(
    private router: Router,
    private browserTitle: Title,
    private meta: Meta
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof ActivationEnd),
        filter((e: ActivationEnd) => e.snapshot.firstChild === null),
        map(({ snapshot: { data } }: ActivationEnd) => data)
      )
      .subscribe(data => {
        this.title = data.title;
        this.browserTitle.setTitle(data.title);
        const metaTag: MetaDefinition = {
          name: 'description',
          content: data.title
        };
        this.meta.updateTag(metaTag);
      });
  }

  ngOnInit() {}
}
