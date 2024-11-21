use candid::{Nat, Principal};
use ic_cdk::{caller, query};
use num_traits::ToPrimitive;


use crate::{state_handler::STATE, types::{MessageData, PaginatedResult, UserCreationInput}, BlackjackData, WaitlistData};

const APPROVED_PRINCIPALS: &[&str] = &[
    "oxj2h-r6fbj-hqtcn-fv7ye-yneeb-ca3se-c6s42-imvp7-juu33-ovnix-mae", // Paras
    "42l52-e6bwv-2353f-idnxh-5f42y-catp6-j2yxn-msivr-ljpu2-ifqsy-dqe", // Ankur
    "n5ytn-hebsc-fbio3-ll5ed-ermti-6kvdk-sjp4d-pofnb-66xhd-gpj4t-3qe", // Tushar Jain's Plug
    "hc4gt-vtazq-2beqs-7lv5p-4nezq-wl3hs-fojqx-2iwtc-mpxx6-ggswf-7ae", // Tushar Jain's II
    "e2fhy-7j47j-rjnk3-clcfh-2qv3m-pwr46-lkavg-tdb5b-vo4bg-m2dqx-sqe",
    "2nh3q-od732-potbk-gs2yh-nkqyt-i4xtt-fs73b-iirbu-ows4f-glqf5-qae", // Somiya Behera
    "2vxsx-fae",
];



// Function to check if the caller is approved
#[ic_cdk::query]
pub fn is_approved() -> bool {
    let caller_principal = caller(); 
    APPROVED_PRINCIPALS
        .iter()
        .any(|&approved| Principal::from_text(approved).unwrap() == caller_principal)
}

#[ic_cdk::query]
pub fn get_user() -> Result<UserCreationInput, String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let state = state.borrow();
        if let Some(user_data) = state.user_data.get(&caller) {
            Ok(user_data)
        } else {
            Err("New user".to_string())
        }
    })
}

#[ic_cdk::query]
fn get_messages(page_no: Nat, chunk_size: Nat) -> Result<PaginatedResult<MessageData>, String> {
    if !is_approved() {
        return Err("You are not approved".to_string());
    }

    // Access the `message_data` map
    let entries: Vec<(String, MessageData)> = STATE.with(|state| {
        state
            .borrow()
            .message_data
            .iter()
            .map(|(email, data)| (email.clone(), data.clone()))
            .collect()
    });

    if entries.is_empty() {
        return Err("No messages found".to_string());
    }

    // Convert `Nat` to `usize`
    let chunk_size_usize = chunk_size.0.to_usize().ok_or("Chunk size is too large for usize")?;
    let page_no_usize = page_no.0.to_usize().ok_or("Page number is too large for usize")?;

    // Calculate total pages
    let total_pages = (entries.len() + chunk_size_usize - 1) / chunk_size_usize;
    if page_no_usize >= total_pages {
        return Err("Page not found".to_string());
    }

    // Paginate the data
    let start_index = page_no_usize * chunk_size_usize;
    let end_index = (start_index + chunk_size_usize).min(entries.len());

    let paginated_data = entries[start_index..end_index]
        .iter()
        .map(|(_, data)| data.clone())
        .collect::<Vec<_>>();

    // Return the paginated result
    Ok(PaginatedResult {
        data: paginated_data,
        current_page: Nat::from(page_no_usize + 1),
        total_pages: Nat::from(total_pages),
    })
}



#[query]
fn get_blackjack_bet() -> Result<BlackjackData, String> {
    let caller_principal = caller();

    // Access the blackjack_bet map and find the record for the caller
    let bet_data = STATE.with(|state| {
        state
            .borrow()
            .blackjack_bet
            .get(&caller_principal)
            .map(|data| data.clone()) // Use map to clone the data if it exists
    });

    // Return the result or an error message
    match bet_data {
        Some(data) => Ok(data),
        None => Err("Caller not found in the blackjack bet record".to_string()),
    }
}


#[query]
fn get_waitlist(page_no: Nat, chunk_size: Nat) -> Result<PaginatedResult<WaitlistData>, String> {
    use num_traits::ToPrimitive; // Import the ToPrimitive trait

    // Check if the caller is approved
    if !is_approved() {
        return Err("You are not approved".to_string());
    }

    // Access the `waitlist_data` map
    let entries: Vec<(String, WaitlistData)> = STATE.with(|state| {
        state
            .borrow()
            .waitlist_data
            .iter()
            .map(|(email, data)| (email.clone(), data.clone()))
            .collect()
    });

    // Check for empty data
    if entries.is_empty() {
        return Err("No members found".to_string());
    }

    // Convert `Nat` to `usize` using `ToPrimitive`
    let chunk_size_usize = chunk_size.0.to_usize().ok_or("Chunk size is too large for usize")?;
    let page_no_usize = page_no.0.to_usize().ok_or("Page number is too large for usize")?;

    // Calculate total pages
    let total_pages = (entries.len() + chunk_size_usize - 1) / chunk_size_usize;
    if page_no_usize >= total_pages {
        return Err("Page not found".to_string());
    }

    // Paginate the data
    let start_index = page_no_usize * chunk_size_usize;
    let end_index = (start_index + chunk_size_usize).min(entries.len());

    let paginated_data = entries[start_index..end_index]
        .iter()
        .map(|(_, data)| data.clone())
        .collect::<Vec<_>>();

    // Return the paginated result
    Ok(PaginatedResult {
        data: paginated_data,
        current_page: Nat::from(page_no_usize + 1),
        total_pages: Nat::from(total_pages),
    })
}

