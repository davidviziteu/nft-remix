import styles from "./MetaMask.module.scss";
import {FunctionComponent} from "react";
import {Button} from "../Button/Button";

export enum MetaMaskState {
  NOT_INSTALLED,
  NOT_CONNECTED,
}

export interface MetaMaskProps {
  state: MetaMaskState;
  onConnect: () => void;
}

export const MetaMask: FunctionComponent<MetaMaskProps> = (props) => {
  const {state, onConnect} = props;

  return (
    <div className={styles.MetaMask}>
      <div className={styles.MetaMask__content}>
        <div className={styles.MetaMask__content__title}>
          <h1>MetaMask</h1>
          <img className={styles.MetaMask__logo} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"} alt={"MetaMask logo"}/>
        </div>
        <div className={styles.MetaMask__content__description}>
          <p>
            {state === MetaMaskState.NOT_INSTALLED
              ? "Please install MetaMask before using this application."
              : "Please allow MetaMask to connect to your Ethereum wallet."}
          </p>
        </div>
        <div className={styles.MetaMask__content__button}>
          {state === MetaMaskState.NOT_INSTALLED ? <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Button onClick={() => {}}>Get MetaMask</Button>
          </a> :
            <Button onClick={onConnect}>Connect</Button>
          }
        </div>
      </div>
    </div>
  );
};
