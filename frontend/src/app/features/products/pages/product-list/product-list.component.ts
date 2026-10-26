import { Component, OnInit, OnDestroy, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ProductsStore } from "../../../../core/store/products.store";
import { EmptyStateComponent } from "../../../../shared/components/empty-state/empty-state.component";
import { ErrorStateComponent } from "../../../../shared/components/error-state/error-state.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductSkeletonComponent } from "../../components/product-skeleton/product-skeleton.component";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    RouterLink,
    ProductCardComponent,
    ProductSkeletonComponent,
    EmptyStateComponent,
    ErrorStateComponent
  ],
  templateUrl: "./product-list.component.html"
})
export class ProductListComponent implements OnInit, OnDestroy {
  store = inject(ProductsStore);

  ecoCounter = signal(14280);
  private ecoIntervalId?: any;

  categories = [
    {
      id: "vestidos",
      name: "Vestidos",
      count: "3.4k prendas",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpWimkC6IOgvpAb-PTT_a9jH_h4L9VDYNox39MonsSiysLrls-Hi3IreaNGJglKhqir1tzEQWzbGFeiu4qVMUadwNA4YhJ31WBEdiIKPvJU5bxdOAjUbb5261rLY_KubKDW9iDjxSCfVfSg5iY9OR0iSEdcMCTm1qamJYuS56lVZawEK8vmvbNtT5W_kRsrXKHjU4ozvWWA0gH7p443ZEZe0zxmVDrCX9JkuRWAqGepJOcboA4wmqO"
    },
    {
      id: "zapatillas",
      name: "Zapatillas",
      count: "2.8k pares",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANl2E4e5hp7oGZnW7r9Ic51MMcRmy2S1VdFlvCEEP5dFocFYtMughqy8q9zXJKb1XGBtaN6xoMPMQksou3A6pxcSyBiNvwK7JgLozmcngSnxqinL1OgjPsXWLn5rtiS2WfkGNBaGE4OvpCQNTsXoKeSxgMTnbg7g-u4tg5Wxm_IGzApA55IxdHpBkENnHOQb9-9xt7DFNzl-ARnyRbn6nMB96k14HC5eDPg6vZRYaKFwtGsaNT-oty"
    },
    {
      id: "chaquetas",
      name: "Chaquetas",
      count: "1.9k abrigos",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbzQyh4eQQiMN2v4VuY_Z8iTfQYcLR35p5YSlJAX7ixJRCcYvWalsPBpxQ1Lx-a-fXBCMzk3Ay2IA2tVH12QxeuC_b17h2Q6G8v62ighQA6YGJi2luusMQabNSK6bJhIhXnvq0I7lU6vHE6q2iQ1c_u4WNPM3grlFQ-0kdxqp3sNaCTDdCjBJf5gX-AKuiYN9WhLZW3csA-v8EEaxFhqdB5cVJSnlpXEZniGwkuHUN905J-ap7QbEe"
    },
    {
      id: "bolsos",
      name: "Bolsos",
      count: "890 piezas",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDCUOjKRWcyMSqLS3-xs__gjhJki0OshYKQAd1wCnxNCXscjzUyWR5RBET7wdQmVma3kaPWwtf7M9FcNyty2uOMI9kDZOGufJEuNKaT0RAzSDD6ZuqPrOOWRZquQDUWTjpxlcUCRx5shNMpQ2N0Mp9f13NN8Wv07tXkCvB17BIsk-x6WkqquQCv27kubVNivrsBAlnuV3q4489CbYNleXK50HdqnBD4m7GMUS-Wg7Dsjf3FdW1a_5"
    },
    {
      id: "vintage",
      name: "Vintage",
      count: "4.1k tesoros",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6cWd5niQ9aaMQaBDpUSuKYKfEbs7-NyB8oVIO9oPfKc66fVppGq8s4HQPKqfL0kNsWVcySJ_QLz9RUpBVOQKoWtWQs2NcAaXQ3a07lEPGhdUYjoiPdJyJrGemYl5E-eI7Fb3iSYUt7WVlBIAAKOdSJL2SwM8jiuEUai-mCoZ-L4zSJyXV0pXm6lsiVOyRPoi_t-5hnUiMZReb1Uw7TDa5x-bF_Xa3y_3yTFOWQm0io2nFmqi8XWU_"
    },
    {
      id: "punto",
      name: "Punto",
      count: "1.5k prendas",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALjH4nkQqLFwBd3NxFGNcR85XaUXOARkaWhQwp2TKwwkiNO8IhDBQH0sRDks6nEKfTUuMouZ_i3ylvksabVcq1At4dO1VpK33RuiDWzYidXRFmTIpP9tEizU1QpCpOgr0O-FjUmiJb6TmTi-_3sYGqC5P6rKwYvdQ0PPvei7ZkK58mb58k2AD_mTOrtp0nhM1fXiiHLLRapxtFIm7bgYQnaqtz-LUwIu10WZc8lDwNm6IGLUzCKYRK"
    }
  ];

  featuredSellers = [
    {
      id: "s1",
      name: "Andrea Silva",
      rating: "5.0",
      sales: 240,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWb_2in6D-JvI0P0wGd1TnDPYgu15aNHXIaUGA7yNgyr--j4846Eb4yZnZshp6200IWpZeuom-HjMDc3l72KNdGNkOaYkp4jYL1KPadsTSiZw-cQa1T77DKduEyZr9Q7g6gns6DEllxoVbhz6A2YSiJL14ddmUV3mOHYx-BdoKHJ9Y5bQw3iho6k6T5VoetxihKPKQOLfvaZKMH_C1j2aqEOuDKmIGWWxVY69m1TFvlTwTi3Ez2vlN",
      bio: "Armario minimalista escandinavo, linos franceses y prendas de Rouje, Arket y COS.",
      itemsCount: 14,
      isFollowing: false,
      previewImgs: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2kcJ4qR0IZJPkvTYoeb7Gsbd7Yee-SGhv3VuvbnYbyCBsqOkJY5IUf0t1W0zFxMpInbbWv-bYMVaOPHKVJrVKNWzMd688JQROZ4NYyH5-3hqcJNXX0zQ-Bbq3ajPk-IK3-nquVXTjlL_ydoU4SrjVlUxWzHwET5Qpw9B_gQcX46rHkrXC9DSRSCRsE78PM-ktmlyOI37ePt7dS-jTT4z49GLR0wTNFbKkyoZXlLn0BTTtLVOzwh_",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAwtVDi1T9ejwYyfIxvl5dfy_z2XqjZfyuSKuBQvucNu2c7065TOXJceryyTp12R7qu6H7GzeQjww8IjDxImOvP7ulBv-Te2dT6WWVx95vlC84RjHkOWEMj9NMolYYbBiqSAy7Rc2Xxt3nf_Sjyq6XV72JeC6vNTDACJEMcZeHxwPGxYyMx2DqnZD9grN0bom42sAjnmU2KphrFzpPiFuOuzXq5lf84d1zZQXAJQL9n6mHGuCbXyek7",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAd9nQn7EC1QesErTLfFww1Rvs8Gx9umS8PE03ED9kCotXcfcPfY72YEGYA3e0RycbFv1eNO7AifvzSrYHkNuTkVQPuo6YN_nwSRhfYxPLACXiQByWQldVC_yXE3NR1ICJ9hdS0_1ZLRz3Ql14_Wt0WTCmDiYlq3VcNX0CFqY79qwywOMyBscDG2eCgbIXhaGDlGtpcHI-ZDGDBPCG0CzZxdSARpEYZkcjIDCaFeM4K5HM0DhBGL5OR"
      ]
    },
    {
      id: "s2",
      name: "Nico Archivist",
      rating: "4.9",
      sales: 312,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKc1cyWVRescGIuHopPSUcesp0viQfHnno4Xe4mcttY-zUoEwVv_QhGWr5hEx5W6OPpI18l1XqR0DneUSeNaRwMBirJ9OpYmhVMuScmZiSU2klQJ9JrdU3P1lFjpmWkxBDYOIlwVIrwvIK43aK2ni65FmklR77-oGEs2ycw3Bfl6QFdOAnviSUIobJM4gN4YxWZdAeB-NN3Buu3TAUde9HZjn1Y42p1vOsOPdtJ8ed43-40uiI8yXq",
      bio: "Especializado en archivo 90s, sudaderas universitarias USA originales y ropa de trabajo.",
      itemsCount: 28,
      isFollowing: false,
      previewImgs: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpRTa0xm5GHf6XuGTseyZ1eq5egibLHyr8ObMQf_WNoix6H2_lJ4sBAs3-ZQGfbtrkSJNwoutKeSldVL4uI_tKs2Azdd8e6S2W2T0Jd3Gxa6sPtuvnySxDkuIpyR9At81huASHI_mxJMT_GxXEcV7l5VsR9XBQyINz5O941o-KfU3l4BB2RlMPCF_sA_8RQO6osU50_RHOnHnZ7F2IhjfInZ26OkbcNKpej6Z00Ej_SZ1g9cEk-ZjP",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIw-8ZIeuD2vCuhe6qpG5Oz-RxuQ-9DuRoCiy2Z9vjQuk0H7TnIfscQCFThifRKmqAnRpti20PWMqSoKHoNX97b4B31MlqQPvEUZOzkW1dDLmf1vHtZStAky0rdXyKzhlz71rbh0Djgij15onYT0G2ocok35ULuUXrAR_ngytwbk9aMNynxYqc_zp1Dc7x3nkqS1ZUj7A96nvlm2fBdyq2kDWyfspSIx5iQo8aa5rJE1mTm3iRztw",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAVz89SXrQekOMds49cggzWDXGXaFWb4RZJ5ReXaVyK42umkGv1wjXSPrMd6Bu2cJNBrDnO_AuPlHI9C0GIFiiVbuU1cvSddYYpaxrmsU6_ef1-ZSdxR__QhH2wQDSb1RXmvU1tf-I5ZmCDPDTb9z_0iO0VJ04VCZC42YKqwjdMPanXPDjSpzkLC6QQC0WBnbqI8sKhc2K-8sWsu_XJ-zvZq8lOlKCg1Qgsm9VDZ6_KHhDCGIuHaHG"
      ]
    },
    {
      id: "s3",
      name: "Marta Atelier",
      rating: "5.0",
      sales: 185,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOCL5z6TTmfc8WaS2sq2XPkZY-1ZT5RutgInx1KPyQVQqsVhw06uBzUcY8Gg7hQC4-WvqF_YDmAOfTRBYr6R3XZMmOw9jFRcZpATaKEFXH2DfO-L-oD5BBsyV6obhjtne4OAzB_B3pZb8GASsvHDQnOIU6-GN10dTmPddYJ2_Dl-Bz5Ie21pFncPNfBi35_hWaPs8dbm2FbGyuCKWb6_o_6XECpJ0brEk6RLue-VAKGd-iuunBuIDR",
      bio: "Accesorios de lujo, bolsos descatalogados y vestidos de invitada con etiqueta.",
      itemsCount: 9,
      isFollowing: false,
      previewImgs: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwd-YocTfJ5qhIbuNxn-Hl89aDp04karNQE5eMDDoHUU6DmfMwQt4OzRYX4FjxeSRS63YQ8GDhSenJz1icKfo3cFUm6wlQjiF1PhY88rIAu1Rk70Y6owAQTAR2XbCwM_6Q643YYxX4kfcyncX2tRT2-YDzJ-SQ0wr_9om1vSJ64z8XFbDf5kHD4fyxkR4brWAw3ZhYWlVl-VdBetF2KRhG3Uge-Ts6Kemnp_3u6Ehj1Rov-eSZs1B5",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB3u_Rx2BvvaCEjLrM1IpUazBWznhTv8sk-qOuFJcs3bZt5N4ojEPLlcxm42moBn8IKtBSGJFuUMYhAOtfwCEvUyNjaMU3vMZZFp7cMzz2qPdJyag4Iv974cIE_zkK5bQlSC0Z64eOoWSpkNO_E30ZtTzxhQbXMirXXpc5cmI2lsmwmJ05_Luqje6bx94w6ON3ivseC5LE9VKc7E9nuQj5UImYxMOOtsbANkvAPaBQPA6xUaoxfQp4A",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2hJi1h8GoNey5UgNzFAIAOokHl1kX-MeGXdu156oBSBgbTA-XLA_6fHUL_hsK2TdGHjeKsf3fHVRjXhnIjZKSQ1GTM4trod1bA9bYo9xXcmkjlxYVdXsZOWIPQDBLAqySj049We8LJmHvhkDigOTdlzb46Z8NjPwCfEzBgzVr9RfgBjspAhKb0v55iOMvjGYjlLM-fFP1ayQlEIzM4jwoEavvIEPEE2D_hf6zxeqTvQfxe7At4pom"
      ]
    }
  ];

  ngOnInit() {
    this.loadProducts();

    // Pulso dinámico para el contador ecológico
    this.ecoIntervalId = setInterval(() => {
      if (Math.random() > 0.5) {
        this.ecoCounter.update(c => c + Math.floor(Math.random() * 3) + 1);
      }
    }, 4500);
  }

  ngOnDestroy() {
    if (this.ecoIntervalId) {
      clearInterval(this.ecoIntervalId);
    }
  }

  loadProducts() {
    this.store.loadProducts();
  }

  onSearchInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.store.setSearchFilter(val);
  }

  selectCategory(categoryName: string) {
    this.store.setCategoryFilter(categoryName);
    this.scrollToFeed();
  }

  onBrandChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.store.setBrandFilter(val);
  }

  onConditionChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.store.setConditionFilter(val);
  }

  resetFilters() {
    this.store.resetFilters();
  }

  scrollToFeed() {
    const el = document.getElementById("feed-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  toggleFollow(seller: any) {
    seller.isFollowing = !seller.isFollowing;
  }
}
