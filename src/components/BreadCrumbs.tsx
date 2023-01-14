import { ReactNode } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { rootPage, accountPage } from "constants/pageConstants";

export type BreadCrumbProps = {
  childPages?: Target[]
  currentPage: Target
}

type Target = {
  href?: string,
  label: string,
}

export const BreadCrumbs = ({ childPages, currentPage }: BreadCrumbProps) => {

  const router = useRouter();

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component="span"
          onClick={() => router.replace(rootPage.path)}
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          color="inherit"
          href={rootPage.path}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {rootPage.text}
        </Link>
        {
          childPages?.map((page, index) => {
            return(
                <Link
                component="span"
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                color="inherit"
                key={index}
                onClick={() => router.replace(page?.href ?? "")}
              >
                {page.label}
              </Link>
            )
          })
        }
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {currentPage.label}
        </Typography>
      </Breadcrumbs>
      </>
  )

};

export default BreadCrumbs;