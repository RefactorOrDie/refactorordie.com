import * as React from 'react';

// Source adapted from https://github.com/simonhorlick/react-stream-builder

import { Subscription, Observable } from 'rxjs';

/** ConnectionState is the state of connection to an asynchronous computation. */
export enum ConnectionState {
  /** Not currently connected to any asynchronous computation or no value has arrived. */
  init,

  /**
   * Connected to an active asynchronous computation.
   *
   * For example, a Observable that has returned at least one value, but is not
   * yet done.
   */
  active,

  /** Connected to a terminated asynchronous computation. */
  complete,
}

/** ActiveSnapshot enforces that data is present in this snapshot. */
interface ActiveSnapshot<T> {
  state: ConnectionState.active;
  data: T;
}

/** Enforces that data is undefined in this snapshot. */
interface InitSnapshot {
  state: ConnectionState.init;
  data: undefined;
}

/** Enforces that data is undefined in this snapshot. */
interface CompleteSnapshot {
  state: ConnectionState.complete;
  data: undefined;
}

/** The state of an observable at a single point in time. */
export type Snapshot<T> = ActiveSnapshot<T> | InitSnapshot | CompleteSnapshot;


interface ObserverState<T> {
  snapshot: Snapshot<T>;
}

type ObserverProps<T> = {
  /** the observable that is subscribed to for changes. */
  of: Observable<T>;

  /** initial */
  init?: () => React.ReactNode;
  next: (data: T) => React.ReactNode;
  complete?: () => React.ReactNode;
};

const NONE = () => null;

/**
 * Observer builds itself based on the latest value emitted by an Observable.
 * 
 * An example of its usage is the following:
 *
 *    <Observer
 *      of={this.props.bloc.places.pipe(map(filterByPlace(place)))}
 *      next={value => (
 *        <div>{value}</div>
 *      )}
 *    />
 * 
 * You might also want to build something before the {@link rxjs#Observable | Observable} has a value and after it completes:
 * 
 *    <Observer
 *      of={this.props.stagedFile.uploadProgress)}
 *      init={() => <LoadingSpinner/>}
 *      next={percentComplete => <ProgressBar progress={percentComplete * 0.01}/>}
 *      complete={() => <Okay/>}
 *    />
 */
export class Observer<T> extends React.Component<
  ObserverProps<T>,
  ObserverState<T>
> {
  private subscription: Subscription;

  constructor(props: ObserverProps<T>) {
    super(props);
    this.state = {
      snapshot: {
        data: undefined,
        state: ConnectionState.init,
      },
    };
    this.subscription = Subscription.EMPTY;
  }

  componentDidMount() {
    this.subscription = this.props.of.subscribe(
      snapshot =>
        this.setState({
          snapshot: { data: snapshot, state: ConnectionState.active },
        }),
      error => {},
      () =>
        this.setState({
          snapshot: { data: undefined, state: ConnectionState.complete },
        })
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    // Dispatch directly to the user-supplied render function.
    switch (this.state.snapshot.state) {
      case ConnectionState.active:
        return this.props.next(this.state.snapshot.data);
      case ConnectionState.complete:
        return (this.props.complete || NONE)();
      default:
        return (this.props.init || NONE)();
    }
  }
}

export default Observer;
