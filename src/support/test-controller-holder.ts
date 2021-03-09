/* eslint-disable class-methods-use-this */
// Required as not all of these methods can be made static without breaking functionality
import { ITestControllerListener } from './test-controller-listener';

export interface ITestControllerHolder {
  capture(t: TestController): Promise<void>;
  register(listener: ITestControllerListener): void;
  destroy(): void;
  get(): Promise<TestController>;
}

class TestControllerHolderImpl implements ITestControllerHolder {
  private static instance: ITestControllerHolder;

  private static testController: TestController | undefined = undefined;

  private static testControllerListener: ITestControllerListener[] | undefined = [];

  private static captureResolver: any;

  private static getResolver: any;

  public static getInstance(): ITestControllerHolder {
    if (!TestControllerHolderImpl.instance) {
      TestControllerHolderImpl.instance = new TestControllerHolderImpl();
    }
    return TestControllerHolderImpl.instance;
  }

  public capture(t: TestController): Promise<any> {
    TestControllerHolderImpl.testController = t;

    if (TestControllerHolderImpl.testControllerListener) {
      TestControllerHolderImpl.testControllerListener.forEach((l) => l.onTestControllerSet(t));
    }

    if (TestControllerHolderImpl.getResolver) {
      TestControllerHolderImpl.getResolver(t);
    }

    return new Promise((resolve) => {
      TestControllerHolderImpl.captureResolver = resolve;
      return TestControllerHolderImpl.captureResolver;
    });
  }

  public register(testControllerListener: ITestControllerListener): void {
    if (testControllerListener && TestControllerHolderImpl.testControllerListener) {
      TestControllerHolderImpl.testControllerListener.push(testControllerListener);
    }
  }

  public destroy(): void {
    TestControllerHolderImpl.testController = undefined;

    if (TestControllerHolderImpl.captureResolver) {
      TestControllerHolderImpl.captureResolver();
    }
  }

  public get(): Promise<TestController> {
    return new Promise((resolve) => {
      if (TestControllerHolderImpl.testController) {
        // already captured
        resolve(TestControllerHolderImpl.testController);
      } else {
        // resolve (later) when captured
        TestControllerHolderImpl.getResolver = resolve;
      }
    });
  }
}

export const testControllerHolder: ITestControllerHolder = TestControllerHolderImpl.getInstance();
