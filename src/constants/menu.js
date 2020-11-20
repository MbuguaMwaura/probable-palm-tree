const data = [
  {
    id: "dashboard",
    icon: "simple-icon-pie-chart",
    label: "menu.dashboard",
    to: "/app/dashboard/admin"
  },
  {
    id: "user",
    icon: "simple-icon-people",
    label: "menu.users",
    to: "/app/users",
    subs: [
      {
        icon: "iconsminds-mens",
        label: "menu.users-list",
        to: "/app/users/list"
      },
      {
        icon: "simple-icon-user-following",
        label: "menu.approvals",
        to: "/app/users/approvals"
      },
      {
        icon: "iconsminds-conference",
        label: "menu.associations",
        to: "/app/users/associations"
      },
      {
        icon: "iconsminds-key-lock",
        label: "menu.roles",
        to: "/app/users/roles"
      }
    ]
  },
  {
    id: "configuration",
    icon: "iconsminds-pen",
    label: "menu.configuration",
    to: "/app/configuration",
    subs: [
      {
        id: "global-config",
        icon: "simple-icon-settings",
        label: "menu.global",
        to: "/app/configuration/global"
      },
      {
        id: "locations",
        icon: "iconsminds-map-marker",
        label: "menu.locations",
        to: "/app/configuration/locations"
      },
      {
        id: "templates",
        icon: "simple-icon-arrow-down",
        label: "menu.templates",
        to: "/app/configuration/templates",
        subs: [
          {
            icon: "iconsminds-mail-link",
            label: "menu.email",
            to: "/app/configuration/templates/email"
          },
          {
            icon: "simple-icon-screen-smartphone",
            label: "menu.sms",
            to: "/app/configuration/templates/sms"
          }
        ]
      }
    ]

  },
  {
    id: "market-access",
    icon: "iconsminds-shop-4",
    label: "menu.market-access",
    to: "/app/market-access",
    subs: [
      {
        icon: "simple-icon-arrow-down",
        label: "menu.market-place-config",
        to: "/app/market-access/catalogue",
        subs: [
          {
            icon: "iconsminds-mail-link",
            label: "menu.category",
            to: "/app/market-access/catalogue/category"
          },
          {
            icon: "iconsminds-mail-link",
            label: "menu.sub-category",
            to: "/app/market-access/catalogue/sub-category"
          },
          {
            icon: "iconsminds-shopping-basket",
            label: "menu.commodity",
            to: "/app/market-access/catalogue/commodity"
          },
          {
            icon: "iconsminds-motorcycle",
            label: "menu.delivery-option",
            to: "/app/market-access/catalogue/delivery-option"
          },
          {
            icon: "iconsminds-mail-money",
            label: "menu.payment-option",
            to: "/app/market-access/catalogue/payment-option"
          },
          {
            icon: "iconsminds-financial",
            label: "menu.tax",
            to: "/app/market-access/catalogue/tax"
          }

        ]
      },
      {
        id: "metrics",
        icon: "simple-icon-arrow-down",
        label: "menu.metrics-config",
        to: "/app/market-access/config",
        subs: [
          {
            icon: "iconsminds-repair",
            label: "menu.measurement-metric",
            to: "/app/market-access/config/measurement-metric"
          },
          {
            icon: "iconsminds-scale",
            label: "menu.measurement-unit",
            to: "/app/market-access/config/measurement-unit"
          }
        ]
      },
      {
        id: "logistics",
        icon: "simple-icon-arrow-down",
        label: "menu.logistics",
        to: "/app/market-access/logistics",
        subs: [
          {
            icon: "iconsminds-repair",
            label: "menu.service-types",
            to: "/app/market-access/logistics/service-types"
          },
          {
            icon: "iconsminds-jeep",
            label: "menu.vehicle-types",
            to: "/app/market-access/logistics/vehicle-types"
          }
        ]
      },
      {
        id: "market-information",
        icon: "simple-icon-arrow-down",
        label: "menu.market-information",
        to: "/app/market-access/market-information",
        subs: [
          {
            icon: "iconsminds-calculator",
            label: "menu.market-prices",
            to: "/app/market-access/market-information/market-prices"
          },
          {
            icon: "simple-icon-question",
            label: "menu.market-price-inquiries",
            to: "/app/market-access/market-information/price-inquiries"
          },
          {
            icon: "iconsminds-receipt-4",
            label: "menu.trade-volumes",
            to: "/app/market-access/market-information/trade-volumes"
          }
        ]
      }
    ]
  },
  {
    id: "products",
    icon: "iconsminds-box-close",
    label: "menu.products",
    to: "/app/products/admin/manage",
    subs: [
      {
        icon: "simple-icon-list",
        label: "menu.products-list",
        to: "/app/products/admin/manage/list"
      }
      ,
      {
        icon: "iconsminds-stamp",
        label: "menu.approvals",
        to: "/app/products/admin/manage/approval"
      }
    ]
  },
  {
    id: "services",
    icon: "simple-icon-settings",
    label: "menu.logistics",
    to: "/app/services",
    subs: [
      {
        icon: "iconsminds-gears",
        label: "menu.manage-services",
        to: "/app/logistics/services"
      },
      {
        id: "vehicles",
        icon: "iconsminds-jeep",
        label: "menu.vehicles",
        to: "/app/logistics/vehicles"
      }
    ]
  },
  {
    id: "orders",
    icon: "simple-icon-basket-loaded",
    label: "menu.orders",
    to: "/app/orders/",
    subs: [
      {
        icon: "simple-icon-arrow-down",
        label: "menu.market",
        to: "/app/orders/market",
        subs:[
          {
            icon: "simple-icon-exclamation",
            label: "menu.requests",
            to: "/app/orders/market/requests"
          },
          {
            icon: "simple-icon-basket-loaded",
            label: "menu.orders",
            to: "/app/orders/market/orders"
          }
        ]
      },
      {
        icon: "simple-icon-arrow-down",
        label: "menu.logistics",
        to: "/app/orders/logistics",
        subs:[
          {
            icon: "simple-icon-exclamation",
            label: "menu.requests",
            to: "/app/orders/logistics/requests"
          },
          {
            icon: "simple-icon-basket-loaded",
            label: "menu.orders",
            to: "/app/orders/logistics/orders"
          }
        ]
      }
    ]
  },
];
export default data;
