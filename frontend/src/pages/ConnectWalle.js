import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import {
  tokenAddress,
  saleContractAddress,
  tokenABI
} from './CREDENTIALS';

function ConnectWallet() {
  const { t } = useTranslation();
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchTokenBalance = async () => {
    if (!window.ethereum) {
      setError(
        <span>
          {t('metamask_not_installed')}{" "}
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{color: 'blue', textDecoration: 'underline'}}
          >
            https://metamask.io/download.html
          </a>
        </span>
      );
      setIsLoading(false);
      return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const rawBalance = await contract.balanceOf(saleContractAddress);
        const formattedBalance = ethers.utils.formatUnits(rawBalance, 18);

        setBalance(formattedBalance);
        setError(null);
      } catch (err) {
        console.error("Error while getting balance:", err);
        setError("failed_to_load_contract_balance");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenBalance();
  }, [t]);

  return (
    <div>
      {isLoading ? (
        <p>{t('loading_balance')}</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : balance !== null ? (
        <p><strong>{t('mun_token_balance_on_sale_contract')}:</strong> {balance} MUN</p>
      ) : null}
    </div>
  );
}

export default ConnectWallet;

