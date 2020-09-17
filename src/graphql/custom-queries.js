export const listBuildings = /* GraphQL */ `
  query ListBuildings($limit: Int, $nextToken: String) {
    listBuildings(
      filter: {
        or: [{ privacy: { eq: "Public" } }, { privacy: { eq: "Private" } }]
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        community {
          id
          name
        }
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        developer {
          id
          name
          address
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          id
          active
          buyerRebate
          devIncentive
          dollarValues
        }
        createdDate
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          items {
            id
            nickname
            price
            dealPrice
            rentalAssumptions
          }
        }
        userAccess
      }
      nextToken
    }
  }
`;
export const listBuildingsCreate = /* GraphQL */ `
  query ListBuildings(
    $limit: Int
    $nextToken: String
    $filter: ModelBuildingFilterInput
  ) {
    listBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        community {
          id
          name
        }
        name
        city
        owner
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        developer {
          id
          name
          address
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            buyerRebate
            devIncentive
            dollarValues
          }
        }
        createdDate
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          items {
            id
            nickname
            price
            dealPrice
            rentalAssumptions
            squareFootage
          }
        }
        userAccess
      }
      nextToken
    }
  }
`;
export const listUnits = /* GraphQL */ `
  query ListUnits($limit: Int, $nextToken: String) {
    listUnits(
      filter: {
        or: [{ privacy: { eq: "Public" } }, { privacy: { eq: "Private" } }]
      }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        community {
          id
          name
        }
        buildingName {
          id
          name
          addres
          state
          zip
          priceRange
          beds
          baths
          yearBuilt
          unitBreakout
          totalUnits
          floors
          views
          coordinates
          description
          avgLPrice
          avgSFPrice
          avgRPrice
          avgDOM
          fhaApproval
          fnmaApproval
          devIncentive
          images
          videos
          sitePlan
          floorPlans
          marketingCollateral
          offeringMemorandum
          nickname
          condoDues
          userAccess
          createdDate
          privacy
          status
        }
        address
        city
        state
        zip
        unitNumber
        price
        bed
        bath
        squareFootage
        priceSF
        views
        description
        deal {
          id
          active
          buyerRebate
          devIncentive
          dollarValues
          userAccess
          createdDate
          privacy
        }
        devIncentive
        images
        videos
        floorPlan
        marketingCollateral
        offeringMemorandum
        nickname
        userAccess
        createdDate
        privacy
        status
      }
      nextToken
    }
  }
`;

export const listMyUnits = /* GraphQL */ `
  query ListUnits(
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        community {
          id
          name
        }
        buildingName {
          id
          name
          addres
          state
          zip
          priceRange
          beds
          baths
          yearBuilt
          unitBreakout
          totalUnits
          floors
          views
          coordinates
          amenities
          description
          avgLPrice
          avgSFPrice
          avgRPrice
          avgDOM
          fhaApproval
          fnmaApproval
          devIncentive
          images
          videos
          sitePlan
          floorPlans
          marketingCollateral
          offeringMemorandum
          nickname
          condoDues
          userAccess
          createdDate
          privacy
          status
          owner
        }
        address
        city
        state
        zip
        unitNumber
        price
        bed
        bath
        squareFootage
        priceSF
        views
        description
        amenities
        deal {
          id
          active
          buyerRebate
          devIncentive
          dollarValues
          userAccess
          createdDate
          privacy
          owner
        }
        devIncentive
        images
        videos
        floorPlan
        marketingCollateral
        offeringMemorandum
        nickname
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          items {
            id
            user
            user_name
            unit {
              id
              nickname
              userAccess
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const listDeals = /* GraphQL */ `
  query ListDeals(
    $filter: ModelDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        active
        title
        images
        units {
          items {
            id
            quantity
            unit {
              id
              address
              city
              state
              zip
              unitNumber
              price
              bed
              bath
              squareFootage
              priceSF
              views
              description
              amenities
              devIncentive
              images
              videos
              floorPlan
              marketingCollateral
              offeringMemorandum
              nickname
              userAccess
              createdDate
              privacy
              status
              owner
              rentalApproval
              quantity
              dealPrice
              number
              quantityInDeal
              rentalAssumptions
              managementSF
              propertyTaxSF
              insuranceSF
              repairSF
              createdAt
              updatedAt
            }
          }
        }
        building {
          id
          community {
            id
            name
            createdAt
            updatedAt
          }
          neighborhood
          totalSF
          name
          city
          addres
          state
          zip
          priceRange
          beds
          baths
          yearBuilt
          unitBreakout
          totalUnits
          floors
          views
          coordinates
          amenities
          developer {
            id
            name
            address
            city
            state
            zip
            webAddress
            email
            tel
            mobile
            nonCircumvent
            dealsPosted
            numberOfProjects
            yearFormed
            reservationAssignmentTerms
            contractFlippingTerms
            createdAt
            updatedAt
          }
          architect
          description
          avgLPrice
          avgSFPrice
          avgRPrice
          avgDOM
          fhaApproval
          fnmaApproval
          rentalApproval
          deal {
            items {
              id
              active
              title
              buyerRebate
              devIncentive
              dollarValues
              userAccess
              createdDate
              privacy
              owner
              rentalApproval
              offeringMemorandum
              otherDocs
              publicDesc
              privateDesc
              rentalAssumptions
              discount
              createdAt
              updatedAt
            }
          }
          devIncentive
          images
          videos
          sitePlan
          floorPlans
          marketingCollateral
          offeringMemorandum
          nickname
          condoDues
          units {
            nextToken
          }
          userAccess
          createdDate
          privacy
          status
          owner
          accessRequets {
            nextToken
          }
          totalSfForSale
          totalSfValue
          lastSaleDate
          lastSaleAmount
          lastSaleSF
          historicalAppreciation
          createdAt
          updatedAt
        }
        unitNumbers {
          items {
            id
            address
            city
            state
            zip
            unitNumber
            price
            bed
            bath
            squareFootage
            priceSF
            views
            description
            amenities
            devIncentive
            images
            videos
            floorPlan
            marketingCollateral
            offeringMemorandum
            nickname
            userAccess
            createdDate
            privacy
            status
            owner
            rentalApproval
            quantity
            dealPrice
            number
            quantityInDeal
            rentalAssumptions
            managementSF
            propertyTaxSF
            insuranceSF
            repairSF
            createdAt
            updatedAt
          }
          nextToken
        }
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
          deals {
            nextToken
          }
          buildings {
            nextToken
          }
          user {
            id
            firstName
            lastName
            username
            email
            tel
            mobile
            nonCircumvent
            preApproved
            accredited
            newsletter
            avatar
            favorites
            favoriteBuildings
            favoriteDeals
            accessRequests
            notificationRequests
            notificationGranted
            notificationDenied
            notificationNew
            notificationDigest
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        buyerRebate
        devIncentive
        dollarValues
        leads {
          items {
            id
          }
          nextToken
        }
        userAccess
        createdDate
        privacy
        owner
        rentalApproval
        accessRequets {
          items {
            id
            user
            user_name
            createdAt
            updatedAt
          }
          nextToken
        }
        offeringMemorandum
        otherDocs
        publicDesc
        privateDesc
        rentalAssumptions
        discount
        notifications {
          items {
            id
            type
            text
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listMyBuildings = /* GraphQL */ `
  query ListBuildings(
    $filter: ModelBuildingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        community {
          id
          name
        }
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        amenities
        developer {
          id
          name
          address
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            buyerRebate
            devIncentive
            dollarValues
            userAccess
            createdDate
            privacy
            owner
          }
        }
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          items {
            id
          }
        }
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          items {
            id
            user
            user_name
            building {
              id
              name
              userAccess
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const listMyDeals = /* GraphQL */ `
  query ListDeals(
    $filter: ModelDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        active
        updatedAt
        createdAt
        building {
          id
          name
          addres
          state
          zip
          priceRange
          beds
          baths
          yearBuilt
          unitBreakout
          totalUnits
          floors
          views
          coordinates
          amenities
          description
          avgLPrice
          avgSFPrice
          avgRPrice
          avgDOM
          fhaApproval
          fnmaApproval
          devIncentive
          images
          videos
          sitePlan
          floorPlans
          marketingCollateral
          offeringMemorandum
          nickname
          condoDues
          userAccess
          createdDate
          privacy
          status
          owner
        }
        unitNumbers {
          nextToken
        }
        developer {
          id
          name
          address
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
        }
        buyerRebate
        devIncentive
        dollarValues
        leads {
          nextToken
        }
        userAccess
        createdDate
        privacy
        owner
        accessRequets {
          items {
            id
            user
            user_name
            createdAt
            updatedAt
            deal {
              id
              userAccess
              title
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const listBuildingsDashboard = /* GraphQL */ `
  query ListBuildings(
    $filter: ModelBuildingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        community {
          id
          name
        }
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        amenities
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            title
            buyerRebate
            devIncentive
            dollarValues
            userAccess
            createdDate
            privacy
            owner
          }
        }
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          items {
            id
          }
        }
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          nextToken
        }
      }
      nextToken
    }
  }
`;

export const editDeal = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
      id
      active
      title
      discount
      offeringMemorandum
      otherDocs
      images
      videos
      featured
      overridePrice
      overrideDiscount
      units {
        items {
          id
          quantity
          index
          unit {
            id
            address
            city
            state
            zip
            unitNumber
            price
            bed
            bath
            squareFootage
            priceSF
            views
            description
            amenities
            devIncentive
            images
            videos
            floorPlan
            marketingCollateral
            offeringMemorandum
            nickname
            userAccess
            createdDate
            privacy
            status
            owner
            rentalApproval
            quantity
            dealPrice
            number
            quantityInDeal
            rentalAssumptions
            managementSF
            propertyTaxSF
            insuranceSF
            repairSF
            createdAt
            updatedAt
          }
        }
      }
      building {
        id
        community {
          id
          name
        }
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        amenities
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            title
            buyerRebate
            devIncentive
            dollarValues
            userAccess
            createdDate
            privacy
            owner
            rentalApproval
          }
        }
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          items {
            id
            nickname
            rentalAssumptions
            price
            dealPrice
            squareFootage
          }
        }
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          nextToken
        }
      }
      unitNumbers {
        items {
          id
          address
          city
          state
          zip
          unitNumber
          price
          bed
          bath
          squareFootage
          priceSF
          views
          description
          amenities
          devIncentive
          images
          videos
          floorPlan
          marketingCollateral
          offeringMemorandum
          nickname
          userAccess
          createdDate
          privacy
          status
          owner
          rentalApproval
          rentalAssumptions
          price
          dealPrice
        }
        nextToken
      }
      developer {
        id
        name
        address
        city
        state
        zip
        webAddress
        email
        tel
        mobile
        nonCircumvent
        dealsPosted
        numberOfProjects
        yearFormed
        reservationAssignmentTerms
        contractFlippingTerms
        deals {
          nextToken
        }
        buildings {
          nextToken
        }
        user {
          id
          firstName
          lastName
          email
          tel
          mobile
          nonCircumvent
          preApproved
          accredited
          newsletter
          avatar
          favorites
          favoriteBuildings
          favoriteDeals
          accessRequests
        }
      }
      buyerRebate
      devIncentive
      dollarValues
      leads {
        items {
          id
        }
        nextToken
      }
      userAccess
      createdDate
      privacy
      owner
      rentalApproval
      accessRequets {
        items {
          id
          user
        }
        nextToken
      }
    }
  }
`;
export const getUserNotifications = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      companyName
      username
      email
      tel
      configured
      mobile
      ignoreDeals
      developer {
        id
        name
        address
        city
        state
        zip
        webAddress
        email
        tel
        mobile
        nonCircumvent
        dealsPosted
        numberOfProjects
        yearFormed
        reservationAssignmentTerms
        contractFlippingTerms
        deals {
          nextToken
        }
        buildings {
          nextToken
        }
        user {
          id
          firstName
          lastName
          username
          email
          tel
          mobile
          nonCircumvent
          preApproved
          accredited
          newsletter
          avatar
          favorites
          favoriteBuildings
          favoriteDeals
          accessRequests
          notificationRequests
          notificationGranted
          notificationDenied
          notificationNew
          notificationDigest
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nonCircumvent
      preApproved
      accredited
      priorTransactions {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      myOffers {
        id
        community {
          id
          name
          createdAt
          updatedAt
        }
        buildingName {
          id
          neighborhood
          totalSF
          name
          city
          addres
          state
          zip
          priceRange
          beds
          baths
          yearBuilt
          unitBreakout
          totalUnits
          floors
          views
          coordinates
          amenities
          architect
          description
          avgLPrice
          avgSFPrice
          avgRPrice
          avgDOM
          fhaApproval
          fnmaApproval
          rentalApproval
          devIncentive
          images
          videos
          sitePlan
          floorPlans
          marketingCollateral
          offeringMemorandum
          nickname
          condoDues
          userAccess
          createdDate
          privacy
          status
          owner
          createdAt
          updatedAt
        }
        address
        city
        state
        zip
        unitNumber
        price
        bed
        bath
        squareFootage
        priceSF
        views
        description
        amenities
        deal {
          id
          active
          title
          buyerRebate
          devIncentive
          dollarValues
          userAccess
          createdDate
          privacy
          owner
          rentalApproval
          offeringMemorandum
          otherDocs
          publicDesc
          privateDesc
          rentalAssumptions
          discount
          createdAt
          updatedAt
        }
        devIncentive
        images
        videos
        floorPlan
        marketingCollateral
        offeringMemorandum
        nickname
        userAccess
        createdDate
        privacy
        status
        owner
        rentalApproval
        accessRequets {
          nextToken
        }
        quantity
        dealPrice
        number
        quantityInDeal
        rentalAssumptions
        createdAt
        updatedAt
      }
      myReservations {
        id
        community {
          id
          name
          createdAt
          updatedAt
        }
        buildingName {
          id
          neighborhood
          totalSF
          name
          city
          addres
          state
          zip
          priceRange
          beds
          baths
          yearBuilt
          unitBreakout
          totalUnits
          floors
          views
          coordinates
          amenities
          architect
          description
          avgLPrice
          avgSFPrice
          avgRPrice
          avgDOM
          fhaApproval
          fnmaApproval
          rentalApproval
          devIncentive
          images
          videos
          sitePlan
          floorPlans
          marketingCollateral
          offeringMemorandum
          nickname
          condoDues
          userAccess
          createdDate
          privacy
          status
          owner
          createdAt
          updatedAt
        }
        address
        city
        state
        zip
        unitNumber
        price
        bed
        bath
        squareFootage
        priceSF
        views
        description
        amenities
        deal {
          id
          active
          title
          buyerRebate
          devIncentive
          dollarValues
          userAccess
          createdDate
          privacy
          owner
          rentalApproval
          offeringMemorandum
          otherDocs
          publicDesc
          privateDesc
          rentalAssumptions
          discount
          createdAt
          updatedAt
        }
        devIncentive
        images
        videos
        floorPlan
        marketingCollateral
        offeringMemorandum
        nickname
        userAccess
        createdDate
        privacy
        status
        owner
        rentalApproval
        accessRequets {
          nextToken
        }
        quantity
        dealPrice
        number
        quantityInDeal
        rentalAssumptions
        createdAt
        updatedAt
      }
      savedDeals {
        id
        active
        title
        building {
          id
          neighborhood
          totalSF
          name
          city
          addres
          state
          zip
          priceRange
          beds
          baths
          yearBuilt
          unitBreakout
          totalUnits
          floors
          views
          coordinates
          amenities
          architect
          description
          avgLPrice
          avgSFPrice
          avgRPrice
          avgDOM
          fhaApproval
          fnmaApproval
          rentalApproval
          devIncentive
          images
          videos
          sitePlan
          floorPlans
          marketingCollateral
          offeringMemorandum
          nickname
          condoDues
          userAccess
          createdDate
          privacy
          status
          owner
          createdAt
          updatedAt
        }
        unitNumbers {
          nextToken
        }
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
          createdAt
          updatedAt
        }
        buyerRebate
        devIncentive
        dollarValues
        leads {
          nextToken
        }
        userAccess
        createdDate
        privacy
        owner
        rentalApproval
        accessRequets {
          nextToken
        }
        offeringMemorandum
        otherDocs
        publicDesc
        privateDesc
        rentalAssumptions
        discount
        notifications {
          nextToken
        }
        createdAt
        updatedAt
      }
      alerts {
        id
        text
        createdAt
        updatedAt
      }
      newsletter
      avatar
      favorites
      favoriteBuildings
      favoriteDeals
      accessRequests
      notificationRequests
      notificationGranted
      notificationDenied
      notificationNew
      notificationDigest
      notifications {
        items {
          id
          type
          text
          createdAt
          updatedAt
          deal {
            id
            title
          }
          sender {
            id
            firstName
            lastName
          }
        }
        nextToken
      }
      sentNotifications {
        items {
          id
          type
          text
          createdAt
          updatedAt
          deal {
            id
            title
          }
          user {
            id
            firstName
            lastName
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getDealNew = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
      id
      active
      title
      updatedAt
      images
      videos
      building {
        id
        buildingTotalSF
        community {
          id
          name
          createdAt
          updatedAt
        }
        neighborhood
        totalSF
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        amenities
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
          createdAt
          updatedAt
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            title
            buyerRebate
            devIncentive
            dollarValues
            userAccess
            createdDate
            privacy
            owner
            rentalApproval
            offeringMemorandum
            otherDocs
            publicDesc
            privateDesc
            rentalAssumptions
            discount
            featured
            unitQuantity
            createdAt
            updatedAt
          }
        }
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          nextToken
        }
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          nextToken
        }
        totalSfForSale
        totalSfValue
        lastSaleDate
        lastSaleAmount
        lastSaleSF
        historicalAppreciation
        createdAt
        updatedAt
      }
      unitNumbers {
        items {
          id
          address
          city
          state
          zip
          unitNumber
          price
          bed
          bath
          squareFootage
          priceSF
          views
          description
          amenities
          devIncentive
          images
          videos
          floorPlan
          marketingCollateral
          offeringMemorandum
          nickname
          userAccess
          createdDate
          privacy
          status
          owner
          rentalApproval
          quantity
          dealPrice
          number
          quantityInDeal
          rentalAssumptions
          managementSF
          propertyTaxSF
          insuranceSF
          repairSF
          createdAt
          updatedAt
        }
        nextToken
      }
      developer {
        id
        name
        address
        city
        state
        zip
        webAddress
        email
        tel
        mobile
        nonCircumvent
        dealsPosted
        numberOfProjects
        yearFormed
        reservationAssignmentTerms
        contractFlippingTerms
        deals {
          nextToken
        }
        buildings {
          nextToken
        }
        user {
          id
          firstName
          lastName
          username
          email
          tel
          mobile
          nonCircumvent
          preApproved
          accredited
          newsletter
          avatar
          favorites
          favoriteBuildings
          favoriteDeals
          accessRequests
          notificationRequests
          notificationGranted
          notificationDenied
          notificationNew
          notificationDigest
          is_sa
          configured
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      buyerRebate
      devIncentive
      dollarValues
      leads {
        items {
          id
        }
        nextToken
      }
      userAccess
      createdDate
      privacy
      owner
      rentalApproval
      accessRequets {
        items {
          id
          user
          user_name
          createdAt
          updatedAt
        }
        nextToken
      }
      offeringMemorandum
      otherDocs
      publicDesc
      privateDesc
      rentalAssumptions
      discount
      notifications {
        items {
          id
          type
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      featured
      unitQuantity
      units {
        items {
          id
          quantity
          index
          unit {
            id
            address
            city
            state
            zip
            unitNumber
            price
            bed
            bath
            bedsCount
            bathsCount
            squareFootage
            priceSF
            views
            description
            amenities
            devIncentive
            images
            videos
            floorPlan
            marketingCollateral
            offeringMemorandum
            nickname
            userAccess
            createdDate
            privacy
            status
            owner
            rentalApproval
            quantity
            dealPrice
            number
            quantityInDeal
            rentalAssumptions
            managementSF
            propertyTaxSF
            insuranceSF
            repairSF
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getDealFavorites = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
      id
      active
      title
      images
      units {
        items {
          id
          quantity
          unit {
            id
            address
            city
            state
            zip
            unitNumber
            price
            bed
            bath
            squareFootage
            priceSF
            views
            description
            amenities
            devIncentive
            images
            videos
            floorPlan
            marketingCollateral
            offeringMemorandum
            nickname
            userAccess
            createdDate
            privacy
            status
            owner
            rentalApproval
            quantity
            dealPrice
            number
            quantityInDeal
            rentalAssumptions
            managementSF
            propertyTaxSF
            insuranceSF
            repairSF
            createdAt
            updatedAt
          }
        }
      }
      building {
        id
        community {
          id
          name
          createdAt
          updatedAt
        }
        neighborhood
        totalSF
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        amenities
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
          createdAt
          updatedAt
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            title
            buyerRebate
            devIncentive
            dollarValues
            userAccess
            createdDate
            privacy
            owner
            rentalApproval
            offeringMemorandum
            otherDocs
            publicDesc
            privateDesc
            rentalAssumptions
            discount
            createdAt
            updatedAt
          }
        }
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          nextToken
        }
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          nextToken
        }
        totalSfForSale
        totalSfValue
        lastSaleDate
        lastSaleAmount
        lastSaleSF
        historicalAppreciation
        createdAt
        updatedAt
      }
      unitNumbers {
        items {
          id
          address
          city
          state
          zip
          unitNumber
          price
          bed
          bath
          squareFootage
          priceSF
          views
          description
          amenities
          devIncentive
          images
          videos
          floorPlan
          marketingCollateral
          offeringMemorandum
          nickname
          userAccess
          createdDate
          privacy
          status
          owner
          rentalApproval
          quantity
          dealPrice
          number
          quantityInDeal
          rentalAssumptions
          managementSF
          propertyTaxSF
          insuranceSF
          repairSF
          createdAt
          updatedAt
        }
        nextToken
      }
      developer {
        id
        name
        address
        city
        state
        zip
        webAddress
        email
        tel
        mobile
        nonCircumvent
        dealsPosted
        numberOfProjects
        yearFormed
        reservationAssignmentTerms
        contractFlippingTerms
        deals {
          nextToken
        }
        buildings {
          nextToken
        }
        user {
          id
          firstName
          lastName
          username
          email
          tel
          mobile
          nonCircumvent
          preApproved
          accredited
          newsletter
          avatar
          favorites
          favoriteBuildings
          favoriteDeals
          accessRequests
          notificationRequests
          notificationGranted
          notificationDenied
          notificationNew
          notificationDigest
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      buyerRebate
      devIncentive
      dollarValues
      leads {
        items {
          id
        }
        nextToken
      }
      userAccess
      createdDate
      privacy
      owner
      rentalApproval
      accessRequets {
        items {
          id
          user
          user_name
          createdAt
          updatedAt
        }
        nextToken
      }
      offeringMemorandum
      otherDocs
      publicDesc
      privateDesc
      rentalAssumptions
      discount
      notifications {
        items {
          id
          type
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getDealGraph = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
      id
      active
      title
      images
      building {
        id
        community {
          id
          name
          createdAt
          updatedAt
        }
        neighborhood
        totalSF
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        amenities
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
          createdAt
          updatedAt
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            title
            buyerRebate
            devIncentive
            dollarValues
            userAccess
            createdDate
            privacy
            owner
            rentalApproval
            offeringMemorandum
            otherDocs
            publicDesc
            privateDesc
            rentalAssumptions
            discount
            featured
            unitQuantity
            createdAt
            updatedAt
          }
        }
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          nextToken
        }
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          nextToken
        }
        totalSfForSale
        totalSfValue
        lastSaleDate
        lastSaleAmount
        lastSaleSF
        historicalAppreciation
        createdAt
        updatedAt
      }
      unitNumbers {
        items {
          id
          address
          city
          state
          zip
          unitNumber
          price
          bed
          bath
          squareFootage
          priceSF
          views
          description
          amenities
          devIncentive
          images
          videos
          floorPlan
          marketingCollateral
          offeringMemorandum
          nickname
          userAccess
          createdDate
          privacy
          status
          owner
          rentalApproval
          quantity
          dealPrice
          number
          quantityInDeal
          rentalAssumptions
          managementSF
          propertyTaxSF
          insuranceSF
          repairSF
          createdAt
          updatedAt
        }
        nextToken
      }
      developer {
        id
        name
        address
        city
        state
        zip
        webAddress
        email
        tel
        mobile
        nonCircumvent
        dealsPosted
        numberOfProjects
        yearFormed
        reservationAssignmentTerms
        contractFlippingTerms
        deals {
          nextToken
        }
        buildings {
          nextToken
        }
        user {
          id
          firstName
          lastName
          username
          email
          tel
          mobile
          nonCircumvent
          preApproved
          accredited
          newsletter
          avatar
          favorites
          favoriteBuildings
          favoriteDeals
          accessRequests
          notificationRequests
          notificationGranted
          notificationDenied
          notificationNew
          notificationDigest
          is_sa
          configured
          ignoreDeals
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      buyerRebate
      devIncentive
      dollarValues
      leads {
        items {
          id
          downPayment
          purchasePrice
          bidAmount
          holdPeriod
          investmentType
          propertyTax
          management
          repairs
          insurance
          vacancy
          customRent
          manualBid
          offerAmount
          userId
          dealId
          investmentTarget
          createdAt
          updatedAt
        }
        nextToken
      }
      userAccess
      createdDate
      privacy
      owner
      rentalApproval
      accessRequets {
        items {
          id
          user
          user_name
          createdAt
          updatedAt
        }
        nextToken
      }
      offeringMemorandum
      otherDocs
      publicDesc
      privateDesc
      rentalAssumptions
      discount
      notifications {
        items {
          id
          type
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      featured
      unitQuantity
      units {
        items {
          id
          quantity
          index
          createdAt
          updatedAt
          unit {
            id
            bed
            bath
            price
            squareFootage
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const getDealMyDeals = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
      id
      active
      title
      images
      units {
        items {
          id
          quantity
          unit {
            id
            address
            city
            state
            zip
            unitNumber
            price
            bed
            bath
            squareFootage
            priceSF
            views
            description
            amenities
            devIncentive
            images
            videos
            floorPlan
            marketingCollateral
            offeringMemorandum
            nickname
            userAccess
            createdDate
            privacy
            status
            owner
            rentalApproval
            quantity
            dealPrice
            number
            quantityInDeal
            rentalAssumptions
            managementSF
            propertyTaxSF
            insuranceSF
            repairSF
            createdAt
            updatedAt
          }
        }
      }
      building {
        id
        community {
          id
          name
          createdAt
          updatedAt
        }
        neighborhood
        totalSF
        name
        city
        addres
        state
        zip
        priceRange
        beds
        baths
        yearBuilt
        unitBreakout
        totalUnits
        floors
        views
        coordinates
        amenities
        developer {
          id
          name
          address
          city
          state
          zip
          webAddress
          email
          tel
          mobile
          nonCircumvent
          dealsPosted
          numberOfProjects
          yearFormed
          reservationAssignmentTerms
          contractFlippingTerms
          createdAt
          updatedAt
        }
        architect
        description
        avgLPrice
        avgSFPrice
        avgRPrice
        avgDOM
        fhaApproval
        fnmaApproval
        rentalApproval
        deal {
          items {
            id
            active
            title
            buyerRebate
            devIncentive
            dollarValues
            userAccess
            createdDate
            privacy
            owner
            rentalApproval
            offeringMemorandum
            otherDocs
            publicDesc
            privateDesc
            rentalAssumptions
            discount
            createdAt
            updatedAt
          }
        }
        devIncentive
        images
        videos
        sitePlan
        floorPlans
        marketingCollateral
        offeringMemorandum
        nickname
        condoDues
        units {
          nextToken
        }
        userAccess
        createdDate
        privacy
        status
        owner
        accessRequets {
          nextToken
        }
        totalSfForSale
        totalSfValue
        lastSaleDate
        lastSaleAmount
        lastSaleSF
        historicalAppreciation
        createdAt
        updatedAt
      }
      unitNumbers {
        items {
          id
          address
          city
          state
          zip
          unitNumber
          price
          bed
          bath
          squareFootage
          priceSF
          views
          description
          amenities
          devIncentive
          images
          videos
          floorPlan
          marketingCollateral
          offeringMemorandum
          nickname
          userAccess
          createdDate
          privacy
          status
          owner
          rentalApproval
          quantity
          dealPrice
          number
          quantityInDeal
          rentalAssumptions
          managementSF
          propertyTaxSF
          insuranceSF
          repairSF
          createdAt
          updatedAt
        }
        nextToken
      }
      developer {
        id
        name
        address
        city
        state
        zip
        webAddress
        email
        tel
        mobile
        nonCircumvent
        dealsPosted
        numberOfProjects
        yearFormed
        reservationAssignmentTerms
        contractFlippingTerms
        deals {
          nextToken
        }
        buildings {
          nextToken
        }
        user {
          id
          firstName
          lastName
          username
          email
          tel
          mobile
          nonCircumvent
          preApproved
          accredited
          newsletter
          avatar
          favorites
          favoriteBuildings
          favoriteDeals
          accessRequests
          notificationRequests
          notificationGranted
          notificationDenied
          notificationNew
          notificationDigest
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      buyerRebate
      devIncentive
      dollarValues
      leads {
        items {
          id
        }
        nextToken
      }
      userAccess
      createdDate
      privacy
      owner
      rentalApproval
      accessRequets {
        items {
          id
          user
          user_name
          createdAt
          updatedAt
        }
        nextToken
      }
      offeringMemorandum
      otherDocs
      publicDesc
      privateDesc
      rentalAssumptions
      discount
      notifications {
        items {
          id
          type
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
