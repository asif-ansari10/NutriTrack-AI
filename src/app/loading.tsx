export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f7f8f8]">

      {/* =================================================
          DESKTOP SIDEBAR SKELETON
      ================================================= */}

      <aside
        className="
          fixed left-0 top-0
          hidden h-screen w-64
          flex-col
          bg-white
          shadow-[4px_0_20px_rgba(0,0,0,0.04)]
          xl:flex
        "
      >
        <div className="flex h-full flex-col p-6">

          {/* Logo */}

          <div className="mb-8 flex items-center gap-3">

            <div className="h-12 w-12 animate-pulse rounded-full bg-[#dfe5e3]" />

            <div className="space-y-2">
              <div className="h-5 w-32 animate-pulse rounded bg-[#dfe5e3]" />

              <div className="h-4 w-24 animate-pulse rounded bg-[#e8eceb]" />
              <div className="h-4 w-20 animate-pulse rounded bg-[#e8eceb]" />
            </div>

          </div>

          {/* Scan button */}

          <div
            className="
              mb-5 h-14
              animate-pulse
              rounded-xl
              bg-[#dfe5e3]
            "
          />

          {/* Navigation */}

          <div className="flex-1 space-y-2">

            <div className="h-12 animate-pulse rounded-xl bg-[#e8eceb]" />

            <div className="h-12 animate-pulse rounded-xl bg-[#f0f3f2]" />

            <div className="h-12 animate-pulse rounded-xl bg-[#f0f3f2]" />

            <div className="h-12 animate-pulse rounded-xl bg-[#f0f3f2]" />

            <div className="h-12 animate-pulse rounded-xl bg-[#f0f3f2]" />

          </div>

          {/* Logout */}

          <div className="border-t border-[#e1e3e4] pt-4">

            <div className="h-12 animate-pulse rounded-xl bg-[#f0f3f2]" />

          </div>

        </div>
      </aside>


      {/* =================================================
          MOBILE HEADER SKELETON
      ================================================= */}

      <header
        className="
          sticky top-0 z-40
          flex h-[72px]
          items-center justify-between
          border-b border-[#e1e3e4]
          bg-white
          px-4
          sm:px-5
          xl:hidden
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              h-11 w-11
              animate-pulse
              rounded-full
              bg-[#dfe5e3]
            "
          />

          <div className="space-y-2">

            <div className="h-5 w-32 animate-pulse rounded bg-[#dfe5e3]" />

            <div className="h-3 w-28 animate-pulse rounded bg-[#e8eceb]" />

          </div>

        </div>

        <div
          className="
            h-10 w-10
            animate-pulse
            rounded-full
            bg-[#e8eceb]
          "
        />

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main
        className="
          min-h-screen
          pb-24
          xl:ml-64
          xl:pb-0
        "
      >

        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >

          {/* Page heading */}

          <div className="mb-8">

            <div
              className="
                h-4 w-32
                animate-pulse
                rounded
                bg-[#dfe5e3]
              "
            />

            <div
              className="
                mt-3
                h-9 w-64
                animate-pulse
                rounded-lg
                bg-[#dfe5e3]
              "
            />

            <div
              className="
                mt-3
                h-4 w-80 max-w-full
                animate-pulse
                rounded
                bg-[#e8eceb]
              "
            />

          </div>


          {/* Cards */}

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-2
            "
          >

            <div
              className="
                h-64
                animate-pulse
                rounded-[24px]
                bg-white
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              "
            />

            <div
              className="
                h-64
                animate-pulse
                rounded-[24px]
                bg-white
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              "
            />

          </div>


          {/* Lower cards */}

          <div className="mt-5 space-y-5">

            <div
              className="
                h-32
                animate-pulse
                rounded-[24px]
                bg-white
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              "
            />

            <div
              className="
                h-32
                animate-pulse
                rounded-[24px]
                bg-white
                shadow-[0_4px_20px_rgba(0,0,0,0.03)]
              "
            />

          </div>

        </div>

      </main>


      {/* =================================================
          MOBILE BOTTOM NAV SKELETON
      ================================================= */}

      <nav
        className="
          fixed bottom-0 left-0
          z-50
          flex h-[76px]
          w-full
          items-center
          justify-around
          border-t border-[#e1e3e4]
          bg-white
          px-1
          sm:h-20
          xl:hidden
        "
      >

        {/* Home */}

        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded bg-[#dfe5e3]" />
          <div className="h-3 w-10 animate-pulse rounded bg-[#e8eceb]" />
        </div>


        {/* Diary */}

        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded bg-[#dfe5e3]" />
          <div className="h-3 w-10 animate-pulse rounded bg-[#e8eceb]" />
        </div>


        {/* Scan */}

        <div className="-mt-7 flex flex-col items-center gap-2">

          <div
            className="
              h-14 w-14
              animate-pulse
              rounded-full
              bg-[#dfe5e3]
              ring-4 ring-[#91f4e6]/40
            "
          />

          <div className="h-3 w-8 animate-pulse rounded bg-[#e8eceb]" />

        </div>


        {/* Progress */}

        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded bg-[#dfe5e3]" />
          <div className="h-3 w-12 animate-pulse rounded bg-[#e8eceb]" />
        </div>


        {/* Profile */}

        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-pulse rounded bg-[#dfe5e3]" />
          <div className="h-3 w-10 animate-pulse rounded bg-[#e8eceb]" />
        </div>

      </nav>

    </div>
  );
}