import React, { useEffect } from 'react';

interface EcwidCartProps {
  storeId: string;
}

const EcwidCart: React.FC<EcwidCartProps> = ({ storeId }) => {
  useEffect(() => {
    if (typeof window.Ecwid !== 'undefined' && window.Ecwid.init) {
      window.Ecwid.init();
    }
  }, []);

  return (
    <div id="my-cart-{storeId}">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.ecwid_script_defer = true;
            window.ecwid_dynamic_widgets = true;
            if (typeof Ecwid != 'undefined') {
              Ecwid.init();
            }
          `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window._xnext_initialization_scripts = [{
              widgetType: 'MinicartPopup',
              id: 'my-cart-${storeId}',
              arg: []
            }];
          `,
        }}
      />
    </div>
  );
};

export default EcwidCart;
