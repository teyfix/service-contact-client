import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {
  private readonly subscriptions = new Set<Subscription>();

  ngOnDestroy(): void {
    this.subscriptions.forEach(this.unsubscribe);
  }

  addSubscription(...subscriptions: Subscription[]) {
    subscriptions.map(subscription => this.subscriptions.add(subscription));
  }

  protected unsubscribe = (subscription: Subscription) => {
    if (this.subscriptions.has(subscription)) {
      this.subscriptions.delete(subscription);
    }

    subscription.unsubscribe();
    subscription = null;
  };
}
