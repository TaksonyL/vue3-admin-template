declare namespace Api {
  namespace queryOrder {
    interface option {
      customerName?: string,
      mobile?: string,
      orderNo?: string,
      licence?: string,
      vin?: string,
      c_id: number
    }
  }

  namespace login {
    interface Option {
      username: string,
      password: string
    }
  }

  namespace logout {
    interface Option {
      token: string
    }
  }

  namespace getInfo {
    interface Option {
      token: string
    }

    interface SuccessResult {
      roles: ('admin' | 'editor')[],
      introduction: string,
      avatar: string,
      name: string
    }
  }
}
