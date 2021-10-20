import * as React from 'react';

function SvgEphys(props: any) {
  return (
    <svg
      viewBox="0 0 256 256"
      {...props}
    >
      <circle
        cx="128"
        cy="128"
        fill={props.fill}
        r="128"
      />
      <path
        d="m43 198.5531a119.6728 119.6728 0 0 1 41.4083 4.5788 3.3466 3.3466 0 0 0 4.1867-3.1893q1.58-32.7465 2.52-65.5194.9367-32.7711 1.2274-65.5564.1637-18.4483.1222-36.8977c-.0092-4.2565-6.5987-4.2631-6.6149 0-.1231 32.4094-.6741 64.8152-1.4469 97.2152q-.3318 13.9085-.71 27.8157a3.3415 3.3415 0 0 0 5.6462 2.3387 37.6164 37.6164 0 0 1 19.5183-11.02c4.0576-.9217 7.8488-.992 12.0749-1.614 4.2978-.6326 8.3306-2.5261 10.585-6.4086 2.278-3.9231 2.2853-8.5952 2.351-12.9915q.1145-7.6556.1386-15.3121c.0423-10.2721.0021-20.5444-.0012-30.8166-.0036-11.3924.039-22.7856.3022-34.1754h-6.615c-.4952 26.93-.2061 53.8664.0958 80.7972q.1326 11.8258.2541 23.6518a3.3471 3.3471 0 0 0 4.9768 2.8559l11.1578-5.5538c3.2362-1.6108 6.8861-2.9836 9.6537-5.3694 3.22-2.7755 3.5588-6.8293 4.0216-10.7789q.68-5.8017 1.1609-11.6242c1.2549-15.0733 1.5275-30.1974 1.7492-45.3141.1255-8.556.2532-17.1122.5451-25.6645h-6.615c-.0142 26.6139-2.5063 53.2154-1.1645 79.8286.3428 6.8.9367 13.5862 1.8246 20.3368.4789 3.641 1.24 7.0839 5.1951 8.3372a37.2387 37.2387 0 0 1 3.7192.8555c-.1764-.0762-.383-.229.09.0751.2707.1742.5543.3226.8211.5048-.1153-.0788-.4009-.3686.0938.0755.2833.2544.5578.5132.817.7924.186.2.3719.4052.5374.6231-.3636-.4787.2635.4231.26.4179a14.8751 14.8751 0 0 1 .8325 1.4857 15.7928 15.7928 0 0 1 1.0481 3.1283 18.6716 18.6716 0 0 1 .484 3.3458c.13 1.63.1868 3.2648.2934 4.8963a30.8591 30.8591 0 0 0 1.7826 9.38c.9329 2.3724 1.8174 4.763 2.8431 7.0979 2.15 4.8936 5.624 9.7853 11.243 10.8 7.9278 1.4321 16.0824-.3024 23.8378-1.9317a3.3083 3.3083 0 0 0 -1.7585-6.3787c-6.4044 1.3455-12.8457 2.6462-19.4234 2.04a10.3911 10.3911 0 0 1 -1.5292-.24c-.2547-.0623-.5013-.1446-.7524-.2184-.156-.0458-.7518-.3262-.2-.0614a14.5818 14.5818 0 0 1 -1.29-.7375c-.52-.3178-.1568-.1095-.04-.0143-.2688-.22-.5246-.4537-.7714-.6975q-.2673-.264-.5177-.5436c.0326.0364-.6058-.72-.325-.3681.283.3551-.3242-.4534-.2938-.41q-.1789-.2576-.3488-.5216a26.3332 26.3332 0 0 1 -1.7042-3.14q-.1773-.3794-.3463-.7625c-.0483-.1089-.3311-.7646-.1335-.2967-.2209-.523-.43-1.0512-.638-1.5794-.4357-1.1068-.8548-2.22-1.2888-3.3276a26.2029 26.2029 0 0 1 -1.7305-8.0894c-.3615-5.5763-.4375-11.3221-3.5611-16.1948a13.4209 13.4209 0 0 0 -5.4825-5.07 15.77 15.77 0 0 0 -3.88-1.097c-.2534-.0473-.4981-.1065-.749-.1613-.7272-.1587-.29-.143-.1425-.0348.28.2053-.0581-.0607-.072-.2.0337.3375-.1153-.6191-.1444-.7678-.5977-3.0567-.81-6.2395-1.1087-9.3368q-.4632-4.8066-.7451-9.6283c-.7559-12.8015-.5877-25.6312-.1738-38.4416.4714-14.589 1.2-29.17 1.2079-43.77.0022-4.2677-6.47-4.2483-6.615 0-.5 14.651-.4949 29.3124-.8917 43.9657-.1968 7.27-.5 14.5381-1.0043 21.7937q-.3993 5.7426-.9735 11.4712-.2715 2.6885-.5856 5.3722a14.6411 14.6411 0 0 1 -.9083 4.7166c-.5964 1.2078-1.7156 1.7983-3.1009 2.5289-1.8108.955-3.6646 1.8345-5.4972 2.7467l-12.05 5.9981 4.9768 2.8559c-.2637-27.37-.72-54.74-.5983-82.1116q.05-11.1694.2485-22.3374c.0783-4.26-6.5166-4.256-6.615 0-.46 19.9308-.2512 39.8684-.286 59.8024q-.0132 7.5363-.0849 15.0722c-.0451 4.3147.3544 9.2358-.72 13.1083a7.2558 7.2558 0 0 1 -2.059 3.5215 9.7523 9.7523 0 0 1 -4.8087 1.7341c-.6169.102-1.2366.1632-2.1448.2463-1.0078.0922-2.0171.1684-3.0239.2716a64.7746 64.7746 0 0 0 -6.5259.9787 44.4482 44.4482 0 0 0 -23.3781 12.9262l5.645 2.3381c.8739-32.4167 1.6043-64.8381 1.9535-97.2651q.15-13.8825.2033-27.7658h-6.6149q.0709 32.7845-.5 65.5659-.5732 32.78-1.7926 65.5434-.686 18.4364-1.5769 36.8642l4.1868-3.1893a125.2647 125.2647 0 0 0 -43.1667-4.8151 3.3844 3.3844 0 0 0 -3.3075 3.3075 3.3365 3.3365 0 0 0 3.3075 3.3074z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgEphys;
